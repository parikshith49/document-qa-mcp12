import app from '../app';

const port = 3000;

app.listen(port, () => {
  console.log(`✅ MCP Server listening at: http://localhost:${port}`);
});
