/** @format */

"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  Download,
  Upload,
  FileText,
  Menu,
  X,
} from "lucide-react";
import { profile } from "@/lib/portfolioData";

type Props = {
  avatarUrl: string;
  onAvatarChange: (dataUrl: string) => void;
  onCVChange: (text: string, name: string) => void;
  cvName: string | null;
};

export default function ProfilePanel({
  avatarUrl,
  onAvatarChange,
  onCVChange,
  cvName,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cvInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleAvatarFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    const reader = new FileReader();

    reader.onload = () => {
      onAvatarChange(reader.result as string);
    };

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

  const SidebarContent = () => (
    <>
      <div className="flex flex-col items-center text-center">
        <div className="group relative">
          <img
            src={avatarUrl}
            alt={profile.name}
            className="h-24 w-24 rounded-full border-2 border-border-light object-cover"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 transition group-hover:opacity-100">
            <Upload size={18} className="text-white" />
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

          <span className="absolute bottom-0 right-1 h-3.5 w-3.5 rounded-full border-2 border-surface bg-accent-mint animate-pulse" />
        </div>

        <h1 className="mt-4 text-lg font-semibold text-text-primary">
          {profile.name}
        </h1>

        <p className="font-mono text-xs text-[#99e2b4]">{profile.title}</p>

        <p className="mt-1 text-xs text-text-dim">{profile.location}</p>

        <p className="mt-2 flex items-center gap-2 text-xs text-accent-mint">
          <span className="h-2 w-2 rounded-full bg-accent-mint"></span>
          Available for work
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-border p-2 hover:border-accent-violet">
          <Github size={16} />
        </a>

        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-border p-2 hover:border-accent-violet">
          <Linkedin size={16} />
        </a>

        <a
          href={profile.twitter}
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-border p-2 hover:border-accent-violet">
          <Twitter size={16} />
        </a>

        <a
          href={`mailto:${profile.email}`}
          className="rounded-lg border border-border p-2 hover:border-accent-violet">
          <Mail size={16} />
        </a>
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-5">
        <a
          href={profile.cvFile}
          download
          className="flex items-center justify-center gap-2 rounded-lg bg-[#469d89] px-4 py-2.5 text-sm font-medium text-black">
          <Download size={15} />
          Download CV
        </a>

        <button
          onClick={() => cvInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm">
          <FileText size={15} />

          {uploading
            ? "Reading..."
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
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-surface p-4 sm:hidden">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg border border-border p-2">
          <Menu size={20} />
        </button>

        <h2 className="font-semibold">{profile.name}</h2>

        <div className="w-10"></div>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden w-72 flex-col gap-6 border-r border-border-light bg-surface p-6 sm:flex">
        <SidebarContent />
      </motion.aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 z-50 flex h-screen w-72 flex-col gap-6 overflow-y-auto bg-surface p-6 shadow-2xl sm:hidden">
              <button
                onClick={() => setMobileOpen(false)}
                className="self-end rounded-lg border border-border p-2">
                <X size={20} />
              </button>

              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
