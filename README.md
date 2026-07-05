# Priti Bishnoi — AI Portfolio Assistant

A chat-style portfolio site. Instead of scrolling through sections, visitors talk to an
AI (powered by Groq's Llama 3.3) that answers questions using Priti's real project,
skills, experience, and contact info — pulled from her
[GitHub portfolio repo](https://github.com/pritibishnoii/my-portfolio).

## Features

- **Chat interface** styled like an IDE — file-tab buttons (`About.tsx`, `Projects.tsx`,
  `Skills.tsx`, `Contact.tsx`) act as quick-start prompts.
- **Streaming AI responses** via the Groq API (OpenAI-compatible endpoint), so replies
  type out in real time.
- **Profile photo upload** — hover the avatar in the sidebar to swap in your own photo
  (stored only in the browser session).
- **CV upload** — drop in a `.txt`/`.md` resume and the AI will use it as extra context
  (other formats are referenced by filename only, since parsing PDFs/Word docs needs a
  server-side library not included here).
- Built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, and
  **GSAP**.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Get a free Groq API key at https://console.groq.com/keys.

3. Copy the env example and add your key:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local`:

   ```
   GROQ_API_KEY=your_key_here
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

## Updating portfolio content

All of Priti's real data (bio, experience, skills, projects, contact links) lives in
one place: **`lib/portfolioData.ts`**. Edit that file whenever a project, job, or link
changes — the AI's answers update automatically since `lib/systemPrompt.ts` builds its
context directly from that data. No prompt-engineering required.

To swap the default CV, replace `public/cv.pdf`.

## Deploying

This is a standard Next.js app — deploys cleanly to Vercel:

```bash
vercel
```

Just remember to set `GROQ_API_KEY` (and optionally `GROQ_MODEL`) in your hosting
provider's environment variables.

## Notes on the CV/image uploads

- The **profile photo** upload is purely visual (stored as a data URL in React state
  for the current session) — it swaps the avatar shown in the sidebar.
- The **CV upload** only reads plain text (`.txt`) or Markdown (`.md`) files directly
  into the AI's system prompt. If you want PDF/DOCX resumes parsed automatically,
  add a server-side parser (e.g. `pdf-parse` or `mammoth`) in a new API route and pass
  the extracted text to `cvText` the same way `ChatWindow` already does.
