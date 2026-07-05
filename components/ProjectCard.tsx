/** @format */

"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export type ProjectData = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  live: string;
  featured: boolean;
};

export default function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface-alt">
      {project.featured && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-accent-violet px-2.5 py-1 font-mono text-[10px] font-medium text-void">
          Featured
        </span>
      )}

      {/* Image with hover overlay */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-void">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-void/0 opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-void/70 group-hover:opacity-100 group-hover:backdrop-blur-[2px]">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex translate-y-2 items-center gap-1.5 rounded-lg bg-surface px-3 py-2 text-xs font-medium text-text-primary opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-surface-hover">
            <Github size={14} />
            Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex translate-y-2 items-center gap-1.5 rounded-lg bg-accent-violet px-3 py-2 text-xs font-medium text-void opacity-0 transition-all delay-75 duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:opacity-90">
            <ExternalLink size={14} />
            Live
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <h3 className="font-display text-sm font-semibold text-text-primary">
          {project.title}
        </h3>
        <p className="line-clamp-3 text-xs leading-relaxed text-text-muted">
          {project.description}
        </p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-text-dim">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3 pt-2 text-xs">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-text-muted transition-colors hover:text-accent-violet">
            <Github size={13} /> Source
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-text-muted transition-colors hover:text-accent-mint">
            <ExternalLink size={13} /> Live demo
          </a>
        </div>
      </div>
    </motion.div>
  );
}
