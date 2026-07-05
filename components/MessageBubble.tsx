/** @format */

"use client";

import { motion } from "framer-motion";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({
  message,
  streaming,
}: {
  message: Message;
  streaming?: boolean;
}) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed sm:max-w-[70%] ${
          isUser
            ? "bg-accent-violet text-void"
            : "border border-border bg-surface-alt text-text-primary"
        }`}>
        <div
          className={`mb-1 font-mono text-[10px] uppercase tracking-wider ${isUser ? "text-void/60" : "text-accent-mint"}`}>
          {isUser ? "»🫠✨you " : "priti.ai »֎✨"}
        </div>
        <div className="whitespace-pre-wrap">
          {message.content}
          {streaming && (
            <span className="ml-0.5 inline-block h-4 w-[2px] animate-blink bg-current align-middle" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
