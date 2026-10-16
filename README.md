# 92 Print Studio (Next.js)
npm install && npm run dev  -> http://localhost:3000
Put real product photo at public/hero.png (transparent PNG, ~1000px wide) to replace the CSS splash art.

## Chatbot (Groq + Qwen)
1. cp .env.example .env.local
2. Put your key in GROQ_API_KEY (key stays on server, never in browser code)
3. Model default: openai/gpt-oss-20b (change with GROQ_MODEL if Groq retires it)
Deploy (Vercel etc.): add the same env vars in project settings.
