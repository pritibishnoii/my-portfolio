/** @format */

"use client";

import { motion } from "framer-motion";
import { User, FolderGit2, Wrench, Mail } from "lucide-react";

export type SectionKey = "about" | "projects" | "skills" | "contact";

const TABS: {
  key: SectionKey;
  file: string;
  icon: typeof User;
  dot: string;
}[] = [
  { key: "about", file: "About.tsx", icon: User, dot: "bg-accent-violet" },
  {
    key: "projects",
    file: "Projects.tsx",
    icon: FolderGit2,
    dot: "bg-accent-mint",
  },
  { key: "skills", file: "Skills.tsx", icon: Wrench, dot: "bg-accent-amber" },
  { key: "contact", file: "Contact.tsx", icon: Mail, dot: "bg-accent-rose" },
];

export default function TabBar({
  active,
  onSelect,
}: {
  active: SectionKey | null;
  onSelect: (key: SectionKey) => void;
}) {
  return (
    <div className="flex items-stretch overflow-x-auto border-b border-border bg-surface">
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        const Icon = tab.icon;
        return (
          <button
            key={tab.key}
            onClick={() => onSelect(tab.key)}
            className={`group relative flex items-center gap-2 whitespace-nowrap px-4 py-3 font-mono text-xs transition-colors sm:text-sm ${
              isActive
                ? "bg-void text-text-primary"
                : "text-text-muted hover:bg-surface-hover hover:text-text-primary"
            }`}>
            <Icon size={14} className="opacity-70" />
            <span>{tab.file}</span>
            <span
              className={`h-1.5 w-1.5 rounded-full ${tab.dot} opacity-80`}
            />
            {isActive && (
              <motion.div
                layoutId="tab-underline"
                className="absolute inset-x-0 bottom-0 h-[2px] bg-[#469d89"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
