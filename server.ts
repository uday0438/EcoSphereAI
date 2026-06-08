import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables from .env.local first, then fall back to .env
dotenv.config({ path: path.join(process.cwd(), ".env.local") });
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/analyze-carbon", async (req, res) => {
    try {
      const { text } = req.body;
      
      // 1. Validate input structure
      if (typeof text !== "string") {
        return res.status(400).json({ error: "Invalid input. Prompt text must be a string." });
      }

      const trimmedText = text.trim();
      if (!trimmedText) {
        return res.status(400).json({ error: "Input prompt cannot be empty." });
      }

      // 2. Input length check (prevents DoS/excessive token usage)
      if (trimmedText.length > 500) {
        return res.status(400).json({ error: "Input exceeds maximum allowed length of 500 characters." });
      }

      // 3. Simple heuristic checks for prompt injection attempts
      const lowerText = trimmedText.toLowerCase();
      const injectionPatterns = [
        "ignore previous instructions",
        "ignore the instructions",
        "ignore above instructions",
        "system prompt",
        "forget your rules",
        "forget what you were told",
        "bypass guidelines",
        "system prompt override",
        "you are now a",
        "stop being a climate coach",
        "ignore the guidelines"
      ];

      const detected = injectionPatterns.some(pattern => lowerText.includes(pattern));
      if (detected) {
        return res.status(400).json({ error: "Potential system prompt manipulation detected. Request blocked." });
      }

      // 4. API Key presence check
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.error("Configuration Error: GEMINI_API_KEY is not defined in the environment.");
        return res.status(500).json({ error: "AI Service is temporarily unavailable due to configuration error." });
      }

      const ai = new GoogleGenAI({ apiKey });
      
      const systemPrompt = `You are EcoSphere AI, a premium, highly intelligent personal climate coach specializing in India's sustainability landscape. 
The user is asking a question or proposing an action regarding their carbon footprint.
Respond in a structured, actionable, and encouraging tone. Use short paragraphs.
Always customize recommendations to the Indian context (e.g., mention Mission LiFE, local mass transit like Delhi Metro, Namma Metro, local trains, or auto-rickshaws, and initiatives like solar rooftop subsidies or local e-waste recyclers like Sogo).
Whenever possible, estimate specific CO2 savings (in kg) using India-specific grid averages (which average ~0.82 kg CO2/kWh for electricity).
Do not hallucinate exact science blindly, but provide realistic, data-grounded estimates based on standard Indian averages.
Format your response cleanly. Use bullet points if listing options. Keep it under 150 words to fit in a UI card.
User input: ${trimmedText}`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: systemPrompt,
      });

      res.json({ result: response.text });
    } catch (error: any) {
      console.error("Gemini API Error details:", error);
      // Safe error masking - hide interior stack traces and raw library errors from client
      res.status(500).json({ error: "An error occurred while generating climate insights. Please try again later." });
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
  }

  // Ensure SPA routing works in both dev and prod
  app.get('*', (req, res) => {
    if (process.env.NODE_ENV === "production") {
      const distPath = path.join(process.cwd(), 'dist');
      res.sendFile(path.join(distPath, 'index.html'));
    } else {
      res.status(404).end(); // Vite middleware handles this in dev mode
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();