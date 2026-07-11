#!/bin/bash
# Opera AI - AWS App Runner Deployment (Hands-off, Auto-scaling)
# Run this on your LOCAL machine. Requires: AWS CLI, Docker Desktop running.
#
# First time? Run these steps first:
#   1. Install AWS CLI:  brew install awscli
#   2. Install Docker:   brew install --cask docker  (then open Docker Desktop)
#   3. Configure AWS:    aws configure
#      - Enter your Access Key ID, Secret Access Key, region (us-east-1)
#   4. Run this script:  chmod +x deploy-apprunner.sh && ./deploy-apprunner.sh

set -e

# ============================================================
# CONFIGURATION
# ============================================================
AWS_REGION="us-east-1"
APP_NAME="opera-ai"
S3_VIDEO_BUCKET="opera-ai-videos-075483"
ECR_REPO_NAME="opera-ai"
IMAGE_TAG="latest"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Opera AI — App Runner Deployment${NC}"
echo ""

# ============================================================
# PREFLIGHT CHECKS
# ============================================================
echo -e "${YELLOW}Checking prerequisites...${NC}"

# Check AWS CLI
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI not found. Install with: brew install awscli${NC}"
    echo "   Then run: aws configure"
    exit 1
fi

# Check Docker
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker not found. Install with: brew install --cask docker${NC}"
    exit 1
fi

# Check Docker is running
if ! docker info &> /dev/null 2>&1; then
    echo -e "${RED}❌ Docker Desktop is not running. Open Docker Desktop and try again.${NC}"
    exit 1
fi

# Check AWS credentials
if ! aws sts get-caller-identity &> /dev/null 2>&1; then
    echo -e "${RED}❌ AWS credentials not configured. Run: aws configure${NC}"
    exit 1
fi

AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_URI="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}"

echo -e "${GREEN}✅ AWS Account: ${AWS_ACCOUNT_ID}${NC}"
echo -e "${GREEN}✅ Docker is running${NC}"
echo -e "${GREEN}✅ Region: ${AWS_REGION}${NC}"
echo ""

# ============================================================
# STEP 1: Create ECR Repository (if it doesn't exist)
# ============================================================
echo -e "${YELLOW}Step 1: Setting up ECR repository...${NC}"

if aws ecr describe-repositories --repository-names "${ECR_REPO_NAME}" --region "${AWS_REGION}" &> /dev/null; then
    echo "   ECR repo already exists"
else
    aws ecr create-repository \
        --repository-name "${ECR_REPO_NAME}" \
        --region "${AWS_REGION}" \
        --image-scanning-configuration scanOnPush=true \
        --query 'repository.repositoryUri' \
        --output text
    echo -e "${GREEN}   Created ECR repo: ${ECR_URI}${NC}"
fi

# ============================================================
# STEP 2: Build Docker Image
# ============================================================
echo ""
echo -e "${YELLOW}Step 2: Building Docker image (this takes 3-5 min first time)...${NC}"

# Build for linux/amd64 (App Runner runs on x86).
# Use layer cache by default (faster, less stress on Docker). For a fully clean build:
#   DOCKER_BUILD_NO_CACHE=1 ./deploy-apprunner.sh
BUILD_ARGS=(--platform linux/amd64 -t "${ECR_REPO_NAME}:${IMAGE_TAG}" .)
if [ -n "${DOCKER_BUILD_NO_CACHE}" ]; then
    echo "   (DOCKER_BUILD_NO_CACHE set — building with --no-cache)"
    BUILD_ARGS=(--no-cache "${BUILD_ARGS[@]}")
fi
docker build "${BUILD_ARGS[@]}"

echo -e "${GREEN}   ✅ Image built${NC}"

# ============================================================
# STEP 3: Push to ECR
# ============================================================
echo ""
echo -e "${YELLOW}Step 3: Pushing image to ECR...${NC}"

# Login to ECR
aws ecr get-login-password --region "${AWS_REGION}" | \
    docker login --username AWS --password-stdin "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

# Tag and push
docker tag "${ECR_REPO_NAME}:${IMAGE_TAG}" "${ECR_URI}:${IMAGE_TAG}"
docker push "${ECR_URI}:${IMAGE_TAG}"

echo -e "${GREEN}   ✅ Image pushed to ECR${NC}"

# ============================================================
# STEP 4: Create IAM Role for App Runner (if needed)
# ============================================================
echo ""
echo -e "${YELLOW}Step 4: Setting up IAM roles...${NC}"

ROLE_NAME="AppRunnerECRAccessRole"

# Check if role exists
if aws iam get-role --role-name "${ROLE_NAME}" &> /dev/null 2>&1; then
    echo "   IAM role already exists"
else
    # Create trust policy
    cat > /tmp/apprunner-trust-policy.json << 'TRUST'
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "Service": "build.apprunner.amazonaws.com"
            },
            "Action": "sts:AssumeRole"
        }
    ]
}
TRUST

    aws iam create-role \
        --role-name "${ROLE_NAME}" \
        --assume-role-policy-document file:///tmp/apprunner-trust-policy.json \
        --output text --query 'Role.Arn'

    aws iam attach-role-policy \
        --role-name "${ROLE_NAME}" \
        --policy-arn "arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess"

    echo -e "${GREEN}   Created IAM role${NC}"
    echo "   Waiting 10s for IAM propagation..."
    sleep 10
fi

ROLE_ARN=$(aws iam get-role --role-name "${ROLE_NAME}" --query 'Role.Arn' --output text)

# ============================================================
# STEP 5: Read env vars from .env.local
# ============================================================
echo ""
echo -e "${YELLOW}Step 5: Loading environment variables from .env.local...${NC}"

ENV_FILE=".env.local"
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}❌ .env.local not found! Create it with your API keys.${NC}"
    exit 1
fi

# Read the actual keys from .env.local (skip comments and empty lines)
CLAUDE_KEY=$(grep "^CLAUDE_API_KEY=" "$ENV_FILE" | cut -d'=' -f2-)
ELEVENLABS_KEY=$(grep "^ELEVENLABS_API_KEY=" "$ENV_FILE" | cut -d'=' -f2-)
GREYFINCH_KEY=$(grep "^GREYFINCH_API_KEY=" "$ENV_FILE" | cut -d'=' -f2-)
GREYFINCH_SECRET=$(grep "^GREYFINCH_API_SECRET=" "$ENV_FILE" | cut -d'=' -f2-)
# Optional DynamoDB table for patient-video job state (multi-instance App Runner). Partition key: jobId (String).
# aws dynamodb create-table --table-name opera-patient-video-jobs --attribute-definitions AttributeName=jobId,AttributeType=S --key-schema AttributeName=jobId,KeyType=HASH --billing-mode PAY_PER_REQUEST --region us-east-1
PATIENT_VIDEO_JOBS_TABLE=$(grep "^PATIENT_VIDEO_JOBS_TABLE=" "$ENV_FILE" 2>/dev/null | cut -d'=' -f2- | tr -d '\r' || echo "")

if [ -z "$CLAUDE_KEY" ] || [ -z "$ELEVENLABS_KEY" ]; then
    echo -e "${RED}❌ Missing CLAUDE_API_KEY or ELEVENLABS_API_KEY in .env.local${NC}"
    exit 1
fi

# Read AWS credentials from ~/.aws/credentials for S3 access inside the container
AWS_ACCESS_KEY_ID=$(grep "aws_access_key_id" ~/.aws/credentials 2>/dev/null | head -1 | awk -F= '{print $2}' | tr -d ' ')
AWS_SECRET_ACCESS_KEY=$(grep "aws_secret_access_key" ~/.aws/credentials 2>/dev/null | head -1 | awk -F= '{print $2}' | tr -d ' ')

echo -e "${GREEN}   ✅ Loaded API keys from .env.local${NC}"

# ============================================================
# STEP 6: Create or Update App Runner Service
# ============================================================
echo ""
echo -e "${YELLOW}Step 6: Deploying to App Runner...${NC}"

SERVICE_NAME="${APP_NAME}"

# Check if service already exists
EXISTING_SERVICE=$(aws apprunner list-services --region "${AWS_REGION}" \
    --query "ServiceSummaryList[?ServiceName=='${SERVICE_NAME}'].ServiceArn" \
    --output text 2>/dev/null || echo "")

if [ -n "$EXISTING_SERVICE" ] && [ "$EXISTING_SERVICE" != "None" ]; then
    echo "   Service exists — updating..."

    aws apprunner update-service \
        --service-arn "${EXISTING_SERVICE}" \
        --region "${AWS_REGION}" \
        --source-configuration "{
            \"ImageRepository\": {
                \"ImageIdentifier\": \"${ECR_URI}:${IMAGE_TAG}\",
                \"ImageRepositoryType\": \"ECR\",
                \"ImageConfiguration\": {
                    \"Port\": \"3000\",
                    \"RuntimeEnvironmentVariables\": {
                        \"CLAUDE_API_KEY\": \"${CLAUDE_KEY}\",
                        \"ELEVENLABS_API_KEY\": \"${ELEVENLABS_KEY}\",
                        \"GREYFINCH_API_KEY\": \"${GREYFINCH_KEY}\",
                        \"GREYFINCH_API_SECRET\": \"${GREYFINCH_SECRET}\",
                        \"S3_VIDEO_BUCKET\": \"${S3_VIDEO_BUCKET}\",
                        \"AWS_REGION\": \"${AWS_REGION}\",
                        \"AWS_ACCESS_KEY_ID\": \"${AWS_ACCESS_KEY_ID}\",
                        \"AWS_SECRET_ACCESS_KEY\": \"${AWS_SECRET_ACCESS_KEY}\",
                        \"REMOTION_CHROME_EXECUTABLE\": \"/usr/bin/chromium\",
                        \"REMOTION_RENDER_SCALE\": \"0.85\",
                        \"OPERA_BGM_PUBLIC_PATH\": \"audio/opera-bgm.m4a\",
                        \"NODE_ENV\": \"production\",
                        \"PATIENT_VIDEO_JOBS_TABLE\": \"${PATIENT_VIDEO_JOBS_TABLE}\"
                    }
                }
            },
            \"AutoDeploymentsEnabled\": false,
            \"AuthenticationConfiguration\": {
                \"AccessRoleArn\": \"${ROLE_ARN}\"
            }
        }" \
        --instance-configuration "{
            \"Cpu\": \"2 vCPU\",
            \"Memory\": \"4 GB\"
        }" \
        --output text --query 'Service.ServiceUrl'

    SERVICE_ARN="${EXISTING_SERVICE}"
else
    echo "   Creating new App Runner service..."

    SERVICE_ARN=$(aws apprunner create-service \
        --service-name "${SERVICE_NAME}" \
        --region "${AWS_REGION}" \
        --source-configuration "{
            \"ImageRepository\": {
                \"ImageIdentifier\": \"${ECR_URI}:${IMAGE_TAG}\",
                \"ImageRepositoryType\": \"ECR\",
                \"ImageConfiguration\": {
                    \"Port\": \"3000\",
                    \"RuntimeEnvironmentVariables\": {
                        \"CLAUDE_API_KEY\": \"${CLAUDE_KEY}\",
                        \"ELEVENLABS_API_KEY\": \"${ELEVENLABS_KEY}\",
                        \"GREYFINCH_API_KEY\": \"${GREYFINCH_KEY}\",
                        \"GREYFINCH_API_SECRET\": \"${GREYFINCH_SECRET}\",
                        \"S3_VIDEO_BUCKET\": \"${S3_VIDEO_BUCKET}\",
                        \"AWS_REGION\": \"${AWS_REGION}\",
                        \"AWS_ACCESS_KEY_ID\": \"${AWS_ACCESS_KEY_ID}\",
                        \"AWS_SECRET_ACCESS_KEY\": \"${AWS_SECRET_ACCESS_KEY}\",
                        \"REMOTION_CHROME_EXECUTABLE\": \"/usr/bin/chromium\",
                        \"REMOTION_RENDER_SCALE\": \"0.85\",
                        \"OPERA_BGM_PUBLIC_PATH\": \"audio/opera-bgm.m4a\",
                        \"NODE_ENV\": \"production\",
                        \"PATIENT_VIDEO_JOBS_TABLE\": \"${PATIENT_VIDEO_JOBS_TABLE}\"
                    }
                }
            },
            \"AutoDeploymentsEnabled\": false,
            \"AuthenticationConfiguration\": {
                \"AccessRoleArn\": \"${ROLE_ARN}\"
            }
        }" \
        --instance-configuration "{
            \"Cpu\": \"2 vCPU\",
            \"Memory\": \"4 GB\"
        }" \
        --auto-scaling-configuration-arn "arn:aws:apprunner:${AWS_REGION}:${AWS_ACCOUNT_ID}:autoscalingconfiguration/DefaultConfiguration/1/00000000000000000000000000000001" \
        --health-check-configuration "{
            \"Protocol\": \"HTTP\",
            \"Path\": \"/\",
            \"Interval\": 20,
            \"Timeout\": 5,
            \"HealthyThreshold\": 1,
            \"UnhealthyThreshold\": 5
        }" \
        --query 'Service.ServiceArn' \
        --output text)

    echo -e "${GREEN}   Service created!${NC}"
fi

# ---------------------------------------------------------------------------
# Wait for RUNNING, then force-deployment, then wait again.
# start-deployment fails with InvalidRequestException if the service is still
# OPERATION_IN_PROGRESS from update-service — that skip prevented :latest rollouts.
# ---------------------------------------------------------------------------
wait_apprunner_running() {
    local phase="$1"
    echo ""
    echo -e "${YELLOW}Step 7 (${phase}): Waiting for App Runner RUNNING...${NC}"
    local max=100
    local i=0
    while [ "$i" -lt "$max" ]; do
        STATUS=$(aws apprunner describe-service \
            --service-arn "${SERVICE_ARN}" \
            --region "${AWS_REGION}" \
            --query 'Service.Status' \
            --output text)

        if [ "$STATUS" = "RUNNING" ]; then
            echo -e "${GREEN}   ${phase}: RUNNING${NC}"
            return 0
        elif [ "$STATUS" = "CREATE_FAILED" ] || [ "$STATUS" = "UPDATE_FAILED" ]; then
            echo -e "${RED}❌ Deployment failed with status: ${STATUS}${NC}"
            echo "   Check logs: aws apprunner list-operations --service-arn ${SERVICE_ARN} --region ${AWS_REGION}"
            exit 1
        fi
        echo "   Status: ${STATUS} — waiting..."
        sleep 15
        i=$((i + 1))
    done
    echo -e "${RED}❌ Timeout waiting for RUNNING (${phase})${NC}"
    exit 1
}

wait_apprunner_running "after update-service"

echo ""
echo -e "${YELLOW}Step 6b: Forcing new deployment (pull fresh :latest from ECR)...${NC}"
if aws apprunner start-deployment \
    --service-arn "${SERVICE_ARN}" \
    --region "${AWS_REGION}" \
    --output text --query 'OperationId'; then
    echo -e "${GREEN}   start-deployment accepted${NC}"
else
    echo -e "${YELLOW}   start-deployment failed (continuing — update may already include new image)${NC}"
fi

wait_apprunner_running "after start-deployment"

SERVICE_URL=$(aws apprunner describe-service \
    --service-arn "${SERVICE_ARN}" \
    --region "${AWS_REGION}" \
    --query 'Service.ServiceUrl' \
    --output text)

echo ""
echo -e "${GREEN}============================================================${NC}"
echo -e "${GREEN}✅ Opera AI is LIVE!${NC}"
echo -e "${GREEN}============================================================${NC}"
echo ""
echo -e "   ${BLUE}URL: https://${SERVICE_URL}${NC}"
echo -e "   Patient Video: https://${SERVICE_URL}/patient-video"
echo ""
echo -e "   ${YELLOW}To update later, just re-run this script.${NC}"
echo -e "   ${YELLOW}To check logs:${NC} aws apprunner list-operations --service-arn ${SERVICE_ARN}"
echo -e "   ${YELLOW}To delete:${NC} aws apprunner delete-service --service-arn ${SERVICE_ARN}"
echo ""
echo -e "   Cost: ~\$25-40/mo at demo usage (2 vCPU, 4GB RAM)"
echo -e "   Auto-scales up if doctors start generating lots of videos."
echo ""
