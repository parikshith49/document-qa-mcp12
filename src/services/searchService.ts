import { QdrantClient } from '@qdrant/js-client-rest';
import { getEmbedding } from './aiService';
import dotenv from 'dotenv';

dotenv.config();

const qdrant = new QdrantClient({
  url: process.env.QDRANT_URL!,
  apiKey: process.env.QDRANT_API_KEY!,
});

export async function search(query: string) {
  const queryEmbedding = await getEmbedding(query);

  const searchResults = await qdrant.search('documents', {
    vector: queryEmbedding,
    limit: 3,
    with_payload: true,
  });

  return searchResults.map(hit => hit.payload?.text);
}
