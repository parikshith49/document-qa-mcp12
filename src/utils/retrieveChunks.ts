import { qdrant } from '../services/qdrantService';
import { embedText } from '../tools/answerTool';

const COLLECTION_NAME = 'documents';

export async function getRelevantChunks(query: string): Promise<string[]> {
  const queryEmbedding = await embedText(query);

  const response = await qdrant.search(COLLECTION_NAME, {
    vector: queryEmbedding,
    limit: 3,
    with_payload: true,
  });

  const chunks: string[] = response.map((item: any) => item.payload?.text || '');
  return chunks;
}
