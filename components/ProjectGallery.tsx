/** @format */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/lib/portfolioData";

export default function ProjectsGallery({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          key="gallery"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden border-b border-border bg-void">
          <div className="max-h-[46vh] overflow-y-auto px-4 py-5 sm:px-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-mono text-xs uppercase tracking-wider text-text-dim">
                Projects.tsx — {projects.length} repos
              </p>
              <button
                onClick={onClose}
                className="rounded-md p-1 text-text-dim transition-colors hover:bg-surface-hover hover:text-text-primary"
                aria-label="Close projects gallery">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.05,
                    ease: "easeOut",
                  }}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
