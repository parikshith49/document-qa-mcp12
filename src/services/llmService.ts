import { openai } from '../config/openai';
import { getRelevantChunks } from '../utils/retrieveChunks';

export async function askQuestion(query: string): Promise<string> {
  const context = await getRelevantChunks(query);

  console.log('📄 Retrieved context:', context);

  if (!context || context.length === 0) {
    return 'No relevant context found.';
  }

  const prompt = `Use the following context to answer the question:\n\n${context.join(
    '\n'
  )}\n\nQuestion: ${query}`;

  const response = await openai.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  });

  return response.choices[0]?.message?.content?.trim() || 'No answer generated.';
}
