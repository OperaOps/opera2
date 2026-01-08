const fs = require('fs');
const path = require('path');

const files = [
  'bulletproof-recent-patients.ts',
  'bulletproof-recent-locations.ts', 
  'bulletproof-recent-appointment-types.ts'
];

files.forEach(filename => {
  const filePath = path.resolve(__dirname, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix imports
  content = content.replace(
    "import axios from 'axios';\nimport fs from 'fs/promises';\nimport path from 'path';",
    "const axios = require('axios');\nconst fs = require('fs').promises;\nconst path = require('path');\n\n// Load environment variables\nrequire('dotenv').config({ path: '../.env.local' });"
  );
  
  // Fix login mutation
  content = content.replace(
    `mutation ApiLogin($apiKey: String!, $apiSecret: String!) {
      apiLogin(apiKey: $apiKey, apiSecret: $apiSecret) {
        accessToken
        expiresAt
      }
    }`,
    `mutation login($key: String!, $secret: String!) {
      apiLogin(key: $key, secret: $secret) {
        accessToken
        accessTokenExpiresIn
        status
      }
    }`
  );
  
  // Fix variables
  content = content.replace(
    'variables: {\n        apiKey: GREYFINCH_API_KEY,\n        apiSecret: GREYFINCH_API_SECRET\n      }',
    'variables: {\n        key: GREYFINCH_API_KEY,\n        secret: GREYFINCH_API_SECRET\n      }'
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`✅ Fixed ${filename}`);
});

console.log('🎉 All files fixed!');
