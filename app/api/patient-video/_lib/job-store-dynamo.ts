/**
 * Optional DynamoDB backing for video jobs (multi-instance App Runner / scale-out).
 * Set PATIENT_VIDEO_JOBS_TABLE to the table name; partition key: jobId (string).
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
} from "@aws-sdk/lib-dynamodb";
import type { RenderInput, VideoJob } from "./job-types";

const TABLE = process.env.PATIENT_VIDEO_JOBS_TABLE?.trim() || "";

let docClient: DynamoDBDocumentClient | null = null;

function getDoc(): DynamoDBDocumentClient {
  if (!docClient) {
    const region =
      process.env.OPERA_AWS_REGION || process.env.AWS_REGION || "us-east-1";
    // Netlify reserves the standard AWS_* names; hosts without an IAM role
    // pass scoped credentials via OPERA_AWS_* (same pattern as clinic-store).
    const accessKeyId = process.env.OPERA_AWS_ACCESS_KEY_ID?.trim();
    const secretAccessKey = process.env.OPERA_AWS_SECRET_ACCESS_KEY?.trim();
    const client = new DynamoDBClient(
      accessKeyId && secretAccessKey
        ? { region, credentials: { accessKeyId, secretAccessKey } }
        : { region }
    );
    docClient = DynamoDBDocumentClient.from(client, {
      marshallOptions: { removeUndefinedValues: true },
    });
  }
  return docClient;
}

export function isDynamoJobStoreEnabled(): boolean {
  return TABLE.length > 0;
}

/** Strip large fields so the Dynamo item stays under 400 KB. */
function slimInput(input: RenderInput): RenderInput {
  return {
    ...input,
    beforePhotoBase64: undefined,
    afterPhotoBase64: undefined,
  };
}

function itemToJob(item: Record<string, unknown>): VideoJob {
  return {
    status: item.status as VideoJob["status"],
    progress: typeof item.progress === "number" ? item.progress : 0,
    step: typeof item.step === "string" ? item.step : "",
    videoPath: (item.videoPath as string) ?? null,
    videoUrl: (item.videoUrl as string) ?? null,
    error: (item.error as string) ?? null,
    createdAt: typeof item.createdAt === "number" ? item.createdAt : 0,
    input: (item.input as RenderInput) ?? ({} as RenderInput),
    contentMode: item.contentMode as string | undefined,
  };
}

export async function dynamoGetJob(jobId: string): Promise<VideoJob | undefined> {
  const r = await getDoc().send(
    new GetCommand({ TableName: TABLE, Key: { jobId } })
  );
  if (!r.Item) return undefined;
  return itemToJob(r.Item as Record<string, unknown>);
}

export async function dynamoPutJob(jobId: string, job: VideoJob): Promise<void> {
  await getDoc().send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        jobId,
        ...job,
        input: slimInput(job.input),
      },
    })
  );
}

/** List recent jobs (newest first). Scan is fine at this table's size. */
export async function dynamoListJobs(limit = 100): Promise<Array<VideoJob & { jobId: string }>> {
  const r = await getDoc().send(new ScanCommand({ TableName: TABLE }));
  const jobs = (r.Items ?? []).map((item) => ({
    ...itemToJob(item as Record<string, unknown>),
    jobId: (item as Record<string, unknown>).jobId as string,
  }));
  jobs.sort((a, b) => (b.createdAt ?? 0) - (a.createdAt ?? 0));
  return jobs.slice(0, limit);
}
