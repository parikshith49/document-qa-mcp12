import fs from 'fs';
import path from 'path';
import { getEmbedding } from './services/aiService';
import { createCollection, addEmbedding } from './services/qdrantService';


function chunkText(text: string, chunkSize = 1000): string[] {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.substring(i, i + chunkSize));
  }
  return chunks;
}

(async () => {
  await createCollection();

  const downloadsPath = path.join(__dirname, '../downloads');
  const files = fs.readdirSync(downloadsPath).filter(file => file.endsWith('.txt'));

  if (files.length === 0) {
    console.log('⚠️  No text files found in ./downloads');
    return;
  }

  for (const file of files) {
    const filePath = path.join(downloadsPath, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const chunks = chunkText(content, 1000);

    console.log(`📄 Processing file: ${file} with ${chunks.length} chunks`);

    for (const chunk of chunks) {
      const embedding = await getEmbedding(chunk);
      await addEmbedding(embedding, chunk);
    }

    console.log(`✅ Completed ingestion for file: ${file}`);
  }

})();
