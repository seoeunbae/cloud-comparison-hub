import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // API routes can go here if needed
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  if (process.env.NODE_ENV === "production") {
    // Serve static files from the dist directory
    app.use(express.static(path.join(__dirname, "dist"), { index: false }));
    
    // Handle SPA routing and inject API key
    app.get("*", async (req, res) => {
      try {
        const indexPath = path.join(__dirname, "dist", "index.html");
        let content = await fs.promises.readFile(indexPath, "utf-8");
        
        // Inject the API key into the window.process object so the frontend can access it
        const apiKey = process.env.GEMINI_API_KEY || "";
        const injection = `<script>window.process = { env: { GEMINI_API_KEY: ${JSON.stringify(apiKey)} } };</script>`;
        content = content.replace("<head>", `<head>\n    ${injection}`);
        
        res.send(content);
      } catch (err) {
        console.error("Error serving index.html:", err);
        res.status(500).send("Internal Server Error");
      }
    });
  } else {
    // Vite middleware for development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(vite.middlewares);

    // Inject API key in dev mode by intercepting the index.html request
    app.use("*", async (req, res, next) => {
      if (req.originalUrl.endsWith(".html") || req.originalUrl === "/") {
        try {
          const template = await fs.promises.readFile(path.resolve(__dirname, "index.html"), "utf-8");
          const html = await vite.transformIndexHtml(req.originalUrl, template);
          
          const apiKey = process.env.GEMINI_API_KEY || "";
          const injection = `<script>window.process = { env: { GEMINI_API_KEY: ${JSON.stringify(apiKey)} } };</script>`;
          const finalHtml = html.replace("<head>", `<head>\n    ${injection}`);
          
          res.status(200).set({ "Content-Type": "text/html" }).end(finalHtml);
        } catch (e) {
          vite.ssrFixStacktrace(e as Error);
          next(e);
        }
      } else {
        next();
      }
    });
  }

  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
