Document Question Answering System

This project is a simple document-based question answering system built using Node.js and TypeScript. It connects with Google Drive to fetch documents, stores them in a Qdrant vector database with embeddings, and allows querying them using a basic API with AI assistance.


Here is the complete project structure for your Document Q&A system following the requirements (Google Drive ingestion, Qdrant Cloud vector DB, AI SDK via OpenAI, MCP server, and modular tools), with port 3000 used only:


document-qa-final/
│
├── downloads/                            # Stores downloaded text files from Google Drive
│   └── *.txt
│
├── public/                               # For optional frontend HTML/CSS if needed
│   └── index.html
│
├── src/
│   ├── mcp/
│   │   └── mcpServer.ts                  # MCP server with /tools endpoints
│
│   ├── routes/
│   │   ├── chatRoutes.ts                 # Handles POST /api/chat
│   │   └── tools.ts                      # Optional: MCP tool router
│
│   ├── services/
│   │   ├── aiService.ts                  # OpenAI embedding + chat logic
│   │   ├── googleDriveService.ts         # Google Drive listing + download
│   │   └── qdrantService.ts              # Qdrant vector DB operations
│
│   ├── tools/
│   │   ├── searchTool.ts                 # MCP-compatible tool for search
│   │   └── answerTool.ts                 # MCP-compatible tool for answer generation
│
│   ├── ingestAndStore.ts                # Loads GDrive files and stores embeddings
│   └── app.ts                           # Main API server on port 3000
│
├── .env                                  # Environment variables (OpenAI, Qdrant, service account path)
├── service-account.json                  # Google service account file
├── package.json                          # Project dependencies and scripts
├── tsconfig.json                         # TypeScript config
└── README.md                             # Project instructions

Packages Required:

Core Dependencies
bash
Copy code
npm install express googleapis openai @qdrant/js-client-rest dotenv
Dev Dependencies (for TypeScript + types)
bash
Copy code
npm install -D typescript ts-node @types/node @types/express
Recommended Scripts for package.json
json
Copy code
"scripts": {
  "start:api": "ts-node src/app.ts",
  "start:mcp": "ts-node src/mcp/mcpServer.ts",
  "ingest": "ts-node src/ingestAndStore.ts"
}
Optional (if using nodemon for live reload)
bash
Copy code
npm install -D nodemon


Features:

The system connects to Google Drive using a service account. It lists and downloads text documents from a specified folder.

Once downloaded, the documents are split into smaller chunks of text. This is necessary to comply with the OpenAI embedding model limits.

Each text chunk is embedded using OpenAI's text embedding model. The embedding vector and the original chunk are stored in Qdrant Cloud.

When a user asks a question, the system creates an embedding for the question, searches Qdrant for the most relevant text chunks based on vector similarity, and uses the results as context.

The context along with the question is sent to OpenAI's GPT-4 model, which generates a natural language answer.

The answer is returned to the user via a REST API endpoint.

Additionally, the system includes a modular MCP server that exposes tools like search and answer generation. These tools follow a simple modular pattern for better separation of concerns.

Technology Stack


The system is built using Node.js and TypeScript.

It uses Google Drive API for document fetching.

Qdrant Cloud is used for vector storage and similarity search.

OpenAI is used for both embedding generation and GPT-4 based question answering.

MCP server pattern is implemented using Express.js for modular tool handling.

How to Run


First, clone this repository and install the dependencies by running npm install.

Create a .env file at the root of the project and provide the following environment variables

OpenAI API key

Qdrant Cloud URL and API key

Service Account path for Google Drive access

Example .env file content

GOOGLE_CLIENT_ID=your-client-id GOOGLE_CLIENT_SECRET=your-client-secret GOOGLE_REDIRECT_URI=http://localhost:3000/oauth2callback GOOGLE_REFRESH_TOKEN=your-refresh-token
QDRANT_HOST=http://localhost:6333 OPENAI_API_KEY=your-openai-api-key

OPENAI_API_KEY=your_openai_api_key
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
SERVICE_ACCOUNT_PATH=./service-account.json

Run the document ingestion script to fetch documents from Google Drive and store embeddings in Qdrant

npx ts-node src/ingestAndStore.ts

Start the MCP server

npx ts-node src/mcp/mcpServer.ts

Start the main chat API server

npx ts-node src/app.ts

API Endpoints

POST on slash api slash chat
Accepts a JSON body with a question and returns the answer from the AI model.

Example request body

question colon What is the company policy question mark

POST on slash tools slash search
Exposes MCP search tool which queries Qdrant directly.

POST on slash tools slash answer
Exposes MCP answer tool which answers based on search results.

Sample Demo

You can test the API by sending a POST request to slash api slash chat with a sample question.

The server will respond with an AI generated answer based on the ingested documents.

Conclusion

This project demonstrates a basic pipeline that connects document storage with semantic search and AI based answering.

The design follows a modular pattern using MCP servers and tools for flexibility.

You can extend this project further by adding authentication, support for more file types.

                                            

 About Me
Parikshith DS
GitHub Profile:https://github.com/parikshith49
Email:parikshithds.1si21ad037@gmail.com                                              