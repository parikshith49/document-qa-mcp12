import { searchInQdrant } from '../services/qdrantService';
import { embedText } from '../services/embeddingService';

export async function searchTool(query: string) {
  const queryEmbedding = await embedText(query);
  return await searchInQdrant(queryEmbedding);
}
