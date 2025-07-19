import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.SERVICE_ACCOUNT_PATH,
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});

const drive = google.drive({ version: 'v3', auth });

export async function listDriveFiles(folderId: string): Promise<{ id: string; name: string }[]> {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType='text/plain' and trashed=false`,
    fields: 'files(id, name)',
  });

  const files = res.data.files ?? [];

  return files
    .filter((file): file is { id: string; name: string } => !!file.id && !!file.name)
    .map(file => ({ id: file.id, name: file.name }));
}

export async function downloadDriveFile(fileId: string, fileName: string): Promise<string> {
  const destPath = path.join('downloads', fileName);
  const dest = fs.createWriteStream(destPath);

  const response = await drive.files.get(
    { fileId, alt: 'media' },
    { responseType: 'stream' }
  );

  response.data.pipe(dest);

  await new Promise<void>((resolve) => dest.on('finish', () => resolve()));

  return destPath;
}
