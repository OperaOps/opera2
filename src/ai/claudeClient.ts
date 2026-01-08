const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY || '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';
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeResponse {
  content: Array<{
    text: string;
    type: 'text';
  }>;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

export async function callClaude(
  messages: ClaudeMessage[],
  maxTokens: number = 1000,
  temperature: number = 0.3
): Promise<ClaudeResponse> {
  const response = await fetch(CLAUDE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CLAUDE_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: maxTokens,
      temperature: temperature,
      messages: messages
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Claude API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

export async function analyzeImage(
  imageBase64: string,
  question: string,
  mimeType: string = 'image/jpeg'
): Promise<string> {
  const messages: ClaudeMessage[] = [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: `Please analyze this image and answer: ${question}`
        },
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: mimeType,
            data: imageBase64
          }
        }
      ] as any
    }
  ];

  const response = await callClaude(messages, 1000);
  return response.content[0].text;
}
