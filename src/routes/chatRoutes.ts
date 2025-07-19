import express from 'express';
import { askQuestion } from '../services/llmService';

const router = express.Router();

router.post('/', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Missing query' });
  }

  try {
    const answer = await askQuestion(query);
    res.json({ answer });
  } catch (err) {
    console.error('Error in /tools/chat route:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
