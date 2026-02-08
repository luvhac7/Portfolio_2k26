import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are LuvGPT, an AI assistant that answers questions about Luv - an AI/ML Engineer. You have complete knowledge of Luv's background, skills, projects, and achievements based on the following resume data.

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
- Use markdown formatting for better readability (bullet points, bold text, etc.)`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Calling Lovable AI Gateway with messages:", messages.length);

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      console.error("AI gateway error:", response.status);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please try again later." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }

      const errorText = await response.text();
      console.error("Error response:", errorText);
      
      return new Response(
        JSON.stringify({ error: "AI gateway error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Streaming response from AI gateway");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
