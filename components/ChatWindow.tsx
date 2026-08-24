/** @format */

"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Send, Sparkles } from "lucide-react";
import MessageBubble, { Message } from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import TabBar, { SectionKey } from "./TabBar";
import { profile, sectionPrompts } from "@/lib/portfolioData";
import ProjectsGallery from "./ProjectGallery";


const WELCOME: Message = {
  role: "assistant",
  content: `Hi, I'm ${profile.name}'s   AI portfolio assistant. Ask me anything — her projects, skills, experience, or how to reach her — or click a file tab above to jump straight in.`,
};

export default function ChatWindow({ cvText }: { cvText: string | null }) {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<SectionKey | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -16 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isWaiting]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsWaiting(true);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({
            role,
            content,
          })),
          cvText: cvText || undefined,
        }),
      });

      if (!res.ok || !res.body) {
        const err = await res
          .json()
          .catch(() => ({ error: "Something went wrong." }));
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `⚠️ ${err.error || "Request failed."}`,
          },
        ]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      setIsWaiting(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantContent += decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1] = {
            role: "assistant",
            content: assistantContent,
          };
          return copy;
        });
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Could not reach the AI. Check your connection and try again.",
        },
      ]);
    } finally {
      setIsStreaming(false);
      setIsWaiting(false);
    }
  };

  const handleTabSelect = (key: SectionKey) => {
    if (key === "projects") {
      setShowGallery((prev) => (activeTab === "projects" ? !prev : true));
    } else {
      setShowGallery(false);
    }
    const alreadyActive = activeTab === key;
    setActiveTab(key);
    if (!alreadyActive) sendMessage(sectionPrompts[key]);
  };

  return (
    <div className="flex h-full flex-1 flex-col min-h-0 ">
      <div
        ref={headerRef}
        className="flex items-center justify-between border-b border-border bg-surface px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-rose" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-amber" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-mint" />
          <span className="ml-3 font-mono text-xs text-text-dim">
            portfolio-assistant.tsx
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-xs text-accent-violet">
          <Sparkles size={13} />
          Groq · Llama 3.3
        </div>
      </div>

      <TabBar active={activeTab} onSelect={handleTabSelect} />

      <ProjectsGallery
        open={showGallery}
        onClose={() => setShowGallery(false)}
      />

      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto bg-void bg-grid px-4 py-6 sm:px-6">
        <div className="space-y-4">
          {messages.map((m, i) => (
            <MessageBubble
              key={i}
              message={m}
              streaming={
                isStreaming &&
                i === messages.length - 1 &&
                m.role === "assistant"
              }
            />
          ))}

          {isWaiting && <TypingIndicator />}
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="shrink-0 flex items-center gap-3 border-t border-border bg-surface px-4 py-4 sm:px-6">
        <span className="font-mono text-accent-mint">›</span>
        <div className="flex w-full  justify-between">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about projects, skills, experience…"
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-dim focus:outline-none"
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="flex items-center gap-1.5 rounded-lg bg-[#469d89] px-4 py-2 text-sm font-medium text-void transition-opacity hover:opacity-90 disabled:opacity-40 ">
            <Send size={14} />
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
