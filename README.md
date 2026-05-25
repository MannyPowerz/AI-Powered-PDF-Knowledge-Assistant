# PDF Knowledge Assistant

An AI-powered full-stack application that lets users upload academic PDF documents and ask natural language questions about their content. Built with a RAG (Retrieval-Augmented Generation) pipeline that chunks, embeds, stores, and retrieves document context to generate grounded answers via a large language model.

> **Note:** This is a learning project built to develop hands-on skills with LangChain.js, vector databases, embedding models, and LLM integration — not a production application.

---

## How It Works

```
Upload PDF → Extract Text → Chunk → Embed → Store in LanceDB
                                                      ↓
User Question → Embed Question → Similarity Search → LLM Generates Answer
```

1. User uploads a PDF through the chat interface
2. The backend extracts text via `pdf-parse`, splits it into overlapping chunks using LangChain's `RecursiveCharacterTextSplitter`, and embeds each chunk locally with `all-MiniLM-L6-v2`
3. Vectors are stored in LanceDB
4. When the user asks a question, the question is embedded, a similarity search retrieves the most relevant chunks, and those chunks are sent alongside the question to Llama 3.3 70B (via Groq) to generate an answer grounded in the document

---

## Tech Stack

| Layer        | Technology                                      |
|-------------|--------------------------------------------------|
| Frontend    | React (Vite)                                     |
| Backend     | Node.js, Express                                 |
| LLM         | Llama 3.3 70B Versatile (via Groq API, free tier)|
| Embeddings  | `Xenova/all-MiniLM-L6-v2` (local via Transformers.js) |
| Vector DB   | LanceDB (local, file-based)                      |
| PDF Parsing | pdf-parse v1.1.1                                 |
| Chunking    | LangChain.js (`RecursiveCharacterTextSplitter`)  |
| File Upload | Multer (memoryStorage)                           |

---

## Prerequisites

- **Node.js** v18 or higher
- **npm**
- A free **Groq API key** — get one at [console.groq.com/keys](https://console.groq.com/keys)

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/MannyPowerz/AI-Powered-PDF-Knowledge-Assistant.git
cd AI-Powered-PDF-Knowledge-Assistant
```

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

### 3. Create backend environment file

Create a `.env` file inside the `Backend/` folder:

```
PORT=3000
GROQ_API_KEY=your_groq_api_key_here
```

### 4. Install frontend dependencies

```bash
cd ../Frontend
npm install
```

### 5. Create frontend environment file

Create a `.env` file inside the `Frontend/` folder:

```
VITE_API_BASE_URL=http://localhost:3000
```

---

## Running the App

You need **two terminals** running simultaneously.

**Terminal 1 — Backend:**

```bash
cd Backend
node src/server.js
```

You should see: `App listening at http://localhost:3000`

**Terminal 2 — Frontend:**

```bash
cd Frontend
npm run dev
```

Open the URL shown in the terminal (typically `http://localhost:5173`).

---

## Usage

1. Click the **paperclip icon** to upload a PDF (max 12MB)
2. Wait for the upload confirmation in the terminal
3. Type a question about the PDF content in the text input
4. Press the **send button** to get an AI-generated answer grounded in the document

---

## Project Structure

```
PDF_KnowledgeAssistant/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── constants.js        # Chunk size, model names, DB config
│   │   ├── controllers/
│   │   │   ├── pdfController.js     # Orchestrates upload pipeline
│   │   │   └── queryController.js   # Orchestrates query pipeline
│   │   ├── middleware/
│   │   │   ├── upload.js            # Multer config (memoryStorage, 12MB, PDF only)
│   │   │   └── validatePdf.js       # Magic-byte verification
│   │   ├── routes/
│   │   │   ├── pdfRoutes.js         # POST /api/pdf/upload
│   │   │   └── queryRoutes.js       # POST /api/query/prompt
│   │   ├── services/
│   │   │   ├── pdfService.js        # PDF text extraction
│   │   │   ├── chunkService.js      # Text chunking via LangChain
│   │   │   ├── embeddingService.js  # Vector embedding (local, singleton)
│   │   │   ├── storageServices.js   # LanceDB store and search
│   │   │   └── queryService.js      # RAG pipeline + Groq LLM call
│   │   ├── app.js                   # Express app setup
│   │   └── server.js                # Server entry point
│   ├── package.json
│   └── .env
├── Frontend/
│   ├── src/
│   │   ├── assets/                  # Icons (paperclip, send, PDF)
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx       # Message display + loading spinner
│   │   │   ├── ChatWindow.css
│   │   │   ├── ChatInput.jsx        # Text input, file upload, send
│   │   │   └── ChatInput.css
│   │   ├── services/
│   │   │   └── api.js               # API calls (sendPrompt, uploadPdf)
│   │   ├── App.jsx                  # Root component, state management
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── .env
└── .gitignore
```

---

## Architecture Decisions

| Decision | Reasoning |
|----------|-----------|
| **Multer memoryStorage** | Files stay in RAM as buffers — no disk I/O, no cleanup burden, no orphaned files |
| **app.js / server.js split** | Separating Express config from server startup enables testing `app.js` without booting a live server |
| **Controller → Service pattern** | Controllers handle HTTP (req/res), services handle business logic — services are portable and testable without Express |
| **Singleton embedding model** | Model loads once on first request, reuses on subsequent calls — avoids expensive re-initialization |
| **Local embeddings** | `all-MiniLM-L6-v2` runs in-process via Transformers.js — zero API cost, no rate limits, fully private |
| **LanceDB** | File-based vector DB with zero infrastructure — no Docker, no server, just a local folder |
| **Chunk overlap** | 100-token overlap between chunks prevents loss of meaning at chunk boundaries |

---

## Key Learnings

- **Embedding models ≠ LLMs** — embeddings convert text to vectors for search; LLMs generate text from prompts. Two separate models serving different roles in the pipeline.
- **RAG prevents hallucination** — by grounding LLM responses in retrieved document chunks rather than relying on the model's training data.
- **LangChain.js is not LangChain Python** — the JS ecosystem has different APIs, fewer features, and less documentation. Tutorials don't transfer 1:1.
- **Chunk size matters** — too small loses context, too large adds noise. 650 tokens with 100 overlap was chosen for dense academic text.
- **Magic-byte validation** — MIME type headers can be spoofed. Checking the actual file bytes (`%PDF` = `25504446`) is the real security check.

---

## Limitations

- Single-user, no authentication
- No chat history persistence (messages reset on page refresh)
- PDF text extraction only (no OCR for scanned documents)
- Embedding model download required on first run (~80MB)
- Groq free tier has rate limits

---

## License

This project was built for educational purposes.
