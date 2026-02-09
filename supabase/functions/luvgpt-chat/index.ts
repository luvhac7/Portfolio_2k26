import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = \`You are LuvGPT, an AI assistant that answers questions about Luv - an AI/ML Engineer. You have complete knowledge of Luv's background, skills, projects, and achievements based on the following resume data.

## About Luv
- Full Name: Luv
- Education: B.E. in Computer Science & Engineering (AI/ML Specialization) from Siddaganga Institute of Technology, Tumakuru, India
- CGPA: 8.65 / 10.00 (Aug 2023 – Jun 2027)
- Previous: Kendriya Vidyalaya, Delhi, India - Class XII: 86% (2021-2022)
- Bio: Passionate AI/ML engineer with expertise in full-stack development, blockchain, and cloud systems. Top 0.16% hackathon finalist with 1,300+ GitHub contributions.

## Skills
### Core Languages:
- C++, C, Java, Go, JavaScript (React/Node.js), SQL

### Cloud & Distributed Systems:
- Microservices, Docker, CI/CD, Google Cloud (Serverless), REST APIs

### CS Fundamentals:
- Data Structures & Algorithms, Object-Oriented Programming, OS Concurrency, DBMS, System Design

### AI/ML Technologies:
- Vertex AI, Zero-Knowledge Proofs, Sentiment Analysis, DeepFace

## Projects

### Nebula — Privacy-Preserving Life OS (dApp)
- Built a ZK-powered Life OS aggregating 3 distinct data streams (Health, Finance, Mood) with inference under 200 ms
- Designed 4 autonomous agents processing 1,000+ simulation data points
- Achieved 98% personalization accuracy with zero-knowledge privacy
- Open-sourced ZK-client integration patterns
- Primary reference architecture for Midnight Network developer ecosystem
- Tech Stack: React, TypeScript, Cardano (Blockfrost), Masumi API, DeepFace, Midnight Network, Zero-Knowledge Proofs

### SentiHeal — AI Mental Wellness Companion
- Engineered real-time AI wellness app with 92% sentiment analysis accuracy
- Processing voice inputs in <300ms for minimal user friction
- Integrated Vertex AI and Firebase for 100+ concurrent requests
- Reduced backend query latency by 40% via optimized Firestore indexing
- Implemented Cloud Run auto-scaling
- Tech Stack: Next.js, TypeScript, Tailwind CSS, Firebase Auth, Firestore, Vertex AI, Docker, Google Cloud, Redis

## Achievements
- Top 15 Finalist | Cardano Hackathon Asia (Top 0.16% of 9,000+ entries) - Led team to deliver full-stack MVP under 48-hour deadline
- 1st Prize | Robocor Competition (300+ participants)
- Google Cloud Credits Award ($500)
- DSA Mentorship: Guided 10+ students, helping them increase ratings by 200+ points on average

## Competitive Programming
- LeetCode: Rating 1722 (Top 11%)
- CodeChef: Rating 1764 (3⋆)
- Codeforces: Pupil
- Problems Solved: 1,400+
- GitHub Contributions: 1,300+ in past year

## Contact
- Email: 1si23ci022@sit.ac.in
- Phone: +91-9123194664
- Location: Tumakuru, Karnataka, India

---

Instructions:
- Always respond in a friendly, enthusiastic, and helpful manner
- Use emojis occasionally to make responses engaging
- When asked about projects, provide detailed information including metrics
- When asked about skills, categorize them appropriately
- When asked about achievements, highlight the impressive statistics (like Top 0.16%)
- Keep responses concise but informative
- If asked about something not in Luv's resume, politely mention that you can only answer questions about Luv's background
- Use markdown formatting for better readability (bullet points, bold text, etc.)\`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");

    if (!GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured");
      throw new Error("GEMINI_API_KEY is not configured");
    }

    // Transform messages from OpenAI format to Gemini format
    // OpenAI: { role: 'user'|'assistant', content: string }
    // Gemini: { role: 'user'|'model', parts: [{ text: string }] }
    const contents = messages.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await fetch(
      \`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:streamGenerateContent?key=\${GEMINI_API_KEY}\`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      throw new Error(\`Gemini API Error: \${response.statusText}\`);
    }

    // Transform Gemini's JSON stream to SSE format compatible with the frontend
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const reader = response.body?.getReader();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    (async () => {
      try {
        if (!reader) throw new Error("No response body");
        
        let buffer = "";
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          buffer += decoder.decode(value, { stream: true });
          
          // Gemini returns a JSON array stream, usually looking like:
          // [{ ... },\r\n { ... }]
          // We'll split mostly by lines or structure.
          // Simplistic parsing for the stream structure:
          
          // Just simplistic splitting by "}\n,\n{" or similar might fail if inside string.
          // However, Google often sends clean chunks.
          // Let's try to parse accumulation.
          
          // Actually, a safer way for simple JSON stream from Google:
          // It starts with '[' and ends with ']'.
          // Items are separated by comma.
          
          // Simple heuristic: Try to find complete objects { ... }
          // This is a bit complex to implement perfectly in a single function without a library.
          // But valid chunks often come in separate packets for separate tokens.
          
          // Let's iterate and try to find matching braces.
          
          let openBraceIndex = buffer.indexOf('{');
          while (openBraceIndex !== -1) {
            let balance = 1;
            let endBraceIndex = -1;
            let inString = false;
            let escape = false;

            for (let i = openBraceIndex + 1; i < buffer.length; i++) {
              const char = buffer[i];
              
              if (escape) {
                 escape = false;
                 continue;
              }
              
              if (char === '\\\\') {
                escape = true;
                continue;
              }
              
              if (char === '"') {
                inString = !inString;
                continue;
              }
              
              if (!inString) {
                if (char === '{') balance++;
                else if (char === '}') {
                  balance--;
                  if (balance === 0) {
                    endBraceIndex = i;
                    break;
                  }
                }
              }
            }

            if (endBraceIndex !== -1) {
              const jsonStr = buffer.substring(openBraceIndex, endBraceIndex + 1);
              buffer = buffer.substring(endBraceIndex + 1);
              
              try {
                const parsed = JSON.parse(jsonStr);
                const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                
                if (text) {
                  // Send in OpenAI SSE format
                  const sseMessage = JSON.stringify({
                    choices: [{ delta: { content: text } }]
                  });
                  await writer.write(encoder.encode(\`data: \${sseMessage}\\n\\n\`));
                }
              } catch (e) {
                console.error("JSON Parse error", e);
              }
              
              openBraceIndex = buffer.indexOf('{');
            } else {
              break; // Wait for more data
            }
          }
        }
        
        await writer.write(encoder.encode("data: [DONE]\\n\\n"));
      } catch (e) {
        console.error("Stream processing error", e);
        const errorMessage = JSON.stringify({ error: String(e) });
        // Try to send error to client if possible
        await writer.write(encoder.encode(\`data: \${errorMessage}\\n\\n\`));
      } finally {
        await writer.close();
      }
    })();

    return new Response(readable, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });

  } catch (error) {
    console.error("Handler error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
