import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

const FOLDER_ID = '1SOGAkQwGjb7vRyI49pmyHX79ACeCYGe_';

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: './service-account.json',
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });

  const drive = google.drive({ version: 'v3', auth });

  const res = await drive.files.list({
    q: `'${FOLDER_ID}' in parents and mimeType='text/plain' and trashed=false`,
    fields: 'files(id, name)',
    pageSize: 100,
  });
  const files = res.data.files || [];
  console.log(`📁 Found ${files.length} .txt file(s)`);

  if (!fs.existsSync('./downloads')) fs.mkdirSync('./downloads');

  for (const file of files) {
    const id = file.id!;
    const name = file.name!;
    console.log(`⬇️ Downloading: ${name}`);
    const destPath = path.join('downloads', name);
    const dest = fs.createWriteStream(destPath);

    const resp = await drive.files.get(
      { fileId: id, alt: 'media' },
      { responseType: 'stream' }
    );
    await new Promise<void>((resolve, reject) => {
      resp.data
        .on('error', reject)
        .on('end', () => {
          console.log(` Downloaded: ${name}`);
          resolve();
        })
        .pipe(dest);
    });
  }
}

main().catch(console.error);
