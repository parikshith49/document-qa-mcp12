import { OpenAIEmbeddings } from '@langchain/openai';

import dotenv from 'dotenv';

dotenv.config();

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY!,
});

export async function embedText(text: string): Promise<number[]> {
  return await embeddings.embedQuery(text);
}
