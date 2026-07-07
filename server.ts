import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from "./constants.js"; // note: you might need to adjust this depending on how constants is exported

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Wait for the API KEY on the first request if not set, or fail fast
  app.post("/api/chat", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'API key is missing. Please provide a valid API key.' });
      }

      const { messages } = req.body;
      
      const ai = new GoogleGenAI({ apiKey });
      const stream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: messages.map((m: any) => m.text).join('\n'),
        config: {
          systemInstruction: 'You are Akshay Mahajan\'s AI assistant. Follow the persona.', // fallback
          temperature: 0.7,
        }
      });

      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Transfer-Encoding', 'chunked');

      for await (const chunk of stream) {
        res.write(chunk.text);
      }
      res.end();
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.message || "Neural link unstable. Please check API key or try again later.";
      res.status(500).json({ error: errorMessage });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
