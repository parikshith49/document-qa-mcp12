import 'dotenv/config';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function getEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: 'text-embedding-ada-002',
    input: text,
  });

  return response.data[0].embedding;
}

export async function getAnswerFromAI(query: string, context: string) {
  if (!context || context.trim() === '') {
    return "Sorry, no relevant information was found in the documents for your query. Please check with the concerned department.";
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: `You are a helpful assistant. Answer the user's query strictly based on the following context:\n\n${context}` },
      { role: 'user', content: query }
    ],
  });

  const message = response.choices?.[0]?.message?.content;
  if (!message) {
    throw new Error('No response from OpenAI');
  }

  return message.trim();
}
