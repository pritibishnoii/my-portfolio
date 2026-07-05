/** @format */

"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Download,
  Upload,
  FileText,
} from "lucide-react";
import { profile } from "@/lib/portfolioData";

export default function ProfilePanel({
  avatarUrl,
  onAvatarChange,
  onCVChange,
  cvName,
}: {
  avatarUrl: string;
  onAvatarChange: (dataUrl: string) => void;
  onCVChange: (text: string, name: string) => void;
  cvName: string | null;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleAvatarFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => onAvatarChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleCVFile = async (file: File) => {
    setUploading(true);
    try {
      if (file.type === "text/plain" || file.name.endsWith(".md")) {
        const text = await file.text();
        onCVChange(text, file.name);
      } else {
        onCVChange("", file.name);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex w-full flex-col gap-6 border-border-light bg-surface p-6 sm:w-72 sm:border-r">
      <div className="flex flex-col items-center text-center">
        <div className="group relative">
          <img
            src={avatarUrl}
            alt={profile.name}
            className="h-24 w-24 rounded-full border-2 border-border-light object-cover"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center rounded-full bg-void/70 opacity-0 transition-opacity group-hover:opacity-100"
            aria-label="Upload profile photo">
            <Upload size={18} className="text-text-primary" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) =>
              e.target.files?.[0] && handleAvatarFile(e.target.files[0])
            }
          />
          <span className="absolute bottom-0 right-1 h-3.5 w-3.5 animate-pulse-slow rounded-full border-2 border-surface bg-accent-mint" />
        </div>

        <h1 className="mt-4 font-display text-lg font-semibold text-text-primary">
          {profile.name}
        </h1>
        <p className="font-mono text-xs text-[#99e2b4]">{profile.title}</p>
        <p className="mt-1 text-xs text-text-dim">{profile.location}</p>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-accent-mint">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-mint" />
          Available for work
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border p-2 text-text-muted transition-colors hover:border-accent-violet hover:text-text-primary">
          <Github size={16} />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border p-2 text-text-muted transition-colors hover:border-accent-violet hover:text-text-primary">
          <Linkedin size={16} />
        </a>
        <a
          href={profile.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border p-2 text-text-muted transition-colors hover:border-accent-violet hover:text-text-primary">
          <Twitter size={16} />
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-lg border border-border p-2 text-text-muted transition-colors hover:border-accent-violet hover:text-text-primary">
          <Mail size={16} />
        </a>
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-5">
        <a
          href={profile.cvFile}
          download
          className="flex items-center justify-center gap-2 rounded-lg bg-[#469d89] px-4 py-2.5 text-sm font-medium text-void transition-opacity hover:opacity-90">
          <Download size={15} />
          Download CV
        </a>

        <button
          onClick={() => cvInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm text-text-muted transition-colors hover:border-accent-violet hover:text-text-primary disabled:opacity-50">
          <FileText size={15} />
          {uploading
            ? "Reading…"
            : cvName
              ? `Using: ${cvName}`
              : "Upload updated CV"}
        </button>
        <input
          ref={cvInputRef}
          type="file"
          accept=".txt,.md,.pdf,.doc,.docx"
          className="hidden"
          onChange={(e) =>
            e.target.files?.[0] && handleCVFile(e.target.files[0])
          }
        />
        <p className="text-center text-[11px] leading-relaxed text-text-dim">
          .txt / .md files are read directly into the AI's context. Other
          formats are referenced by name only.
        </p>
      </div>
    </motion.aside>
  );
}
