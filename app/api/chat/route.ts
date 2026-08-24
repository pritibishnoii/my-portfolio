import { NextRequest } from 'next/server';
import { buildSystemPrompt } from '@/lib/systemPrompt';

export const runtime = 'edge';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';


export async function POST(req: NextRequest) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({
        error:
          'GROQ_API_KEY is not set. Add it to a .env.local file at the project root (see .env.example) and restart the dev server.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const body = await req.json();
  const messages: ChatMessage[] = body.messages || [];
  const cvText: string | undefined = body.cvText;

  const systemPrompt = buildSystemPrompt(Boolean(cvText), cvText);

  const groqRes = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      temperature: 0.6,
      max_tokens: 700,
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
    }),
  });

  if (!groqRes.ok || !groqRes.body) {
    const errText = await groqRes.text().catch(() => 'Unknown error');
    return new Response(JSON.stringify({ error: `Groq API error: ${errText}` }), {
      status: groqRes.status || 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  
  // Re-stream Groq's SSE as plain text chunks the client can append directly.
  const stream = new ReadableStream({
    async start(controller) {
      const reader = groqRes.body!.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const data = trimmed.slice(5).trim();
          if (data === '[DONE]') {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const token = json.choices?.[0]?.delta?.content;
            if (token) controller.enqueue(encoder.encode(token));
          } catch {
            // ignore malformed keep-alive lines
          }
        }
      }
      controller.close();
    },
  });


  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
