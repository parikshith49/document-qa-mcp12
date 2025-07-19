import express from 'express';
import cors from 'cors';
import path from 'path';

import toolsRouter from './routes/tools';
import chatRouter from './routes/chatRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve frontend from /public folder
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

// ✅ Serve index.html at root
app.get('/', (_, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// ✅ API routes
app.use('/tools', toolsRouter);
app.use('/chat', chatRouter);

export default app;
