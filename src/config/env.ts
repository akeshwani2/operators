export const env = {
    OPENAI_API_KEY: process.env.OPENAI_API_KEY as string,
  }
  
  // Validate required env vars
  if (!env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is required')
  }