import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from "./constants.js"; // Use .js extension for compiled output
import fs from "fs";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust proxy for rate limiting behind reverse proxies (e.g. Cloud Run/nginx)
  app.set("trust proxy", 1);

  // Security headers - disable contentSecurityPolicy in dev or configure it for Vite
  app.use(
    helmet({
      contentSecurityPolicy: false, // Disabling CSP to ensure inline scripts/styles from Vite and Framer Motion work seamlessly
      crossOriginEmbedderPolicy: false,
    })
  );

  // Limit JSON payload size to prevent DOS
  app.use(express.json({ limit: "1mb" }));

  // Rate limiting for the AI chat endpoint to prevent abuse
  const chatLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 50 requests per windowMs
    message: { error: "Too many requests from this IP, please try again after 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  // Wait for the API KEY on the first request if not set, or fail fast
  app.post("/api/chat", chatLimiter, async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'API key is missing. Please provide a valid API key.' });
      }
      const { messages } = req.body;
      
      // Basic input validation
      if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) {
        return res.status(400).json({ error: 'Invalid or too many messages.' });
      }

      // Ensure each message is valid and truncate overly long text
      const sanitizedMessages = messages.map((m: any) => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: typeof m.text === 'string' ? m.text.substring(0, 1000) : '' }]
      })).filter(m => m.parts[0].text.length > 0);

      const ai = new GoogleGenAI({ apiKey });
      const stream = await ai.models.generateContentStream({
        model: 'gemini-2.5-flash',
        contents: sanitizedMessages,
        config: {
          systemInstruction: AI_SYSTEM_INSTRUCTION || 'You are Akshay Mahajan\'s AI assistant. Follow the persona.',
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

  const distPath = path.join(process.cwd(), 'dist');
  const isProd = process.env.NODE_ENV === "production" || fs.existsSync(path.join(distPath, 'index.html'));

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: { port: 24679 } },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath, { extensions: ['html'] }));
    
    // Serve the prerendered per-route document so crawlers get real <head>
    // metadata. Falls back to the 404 document, which is marked noindex.
    app.get('*all', (req, res) => {
      const safePath = path.normalize(req.path).replace(/^(\.\.[\/\\])+/, '');
      const routeFile = path.join(distPath, safePath, 'index.html');
      
      if (routeFile.startsWith(path.join(distPath, '/')) && fs.existsSync(routeFile)) {
        return res.sendFile(routeFile);
      }
      res.status(404).sendFile(path.join(distPath, '404.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
