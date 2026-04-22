'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Github,
  Copy,
  Check,
  Terminal,
  Wrench,
  Clipboard,
} from 'lucide-react';
import type { Tool, InstallCommand } from '@/lib/tools-catalog';

function CopyButton({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = command;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }
    }
  }, [command]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border border-fd-border bg-fd-background px-2.5 py-1.5 text-xs font-mono text-fd-foreground hover:bg-fd-muted transition-colors"
      title="Copy to clipboard"
    >
      <Terminal className="w-3 h-3 text-fd-muted-foreground shrink-0" />
      <span className="truncate max-w-[180px] sm:max-w-[220px]">{command}</span>
      {copied ? (
        <Check className="w-3 h-3 text-green-500 shrink-0" />
      ) : (
        <Copy className="w-3 h-3 text-fd-muted-foreground shrink-0" />
      )}
    </button>
  );
}

function AgentInstallBlock({
  agent,
}: {
  agent: Tool['agents'][number];
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        <Wrench className="w-3.5 h-3.5 text-fd-muted-foreground" />
        <span className="text-xs font-medium text-fd-foreground">
          {agent.name}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {agent.installCommands.map((cmd: InstallCommand) => (
          <CopyButton key={cmd.label} command={cmd.command} />
        ))}
      </div>
    </div>
  );
}

function CategoryBadge({
  category,
}: {
  category: Tool['category'];
}) {
  const label =
    category === 'project-management'
      ? 'Project Management'
      : category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <span className="inline-flex items-center rounded-full bg-fd-primary/10 text-fd-primary px-2.5 py-0.5 text-xs font-medium">
      {label}
    </span>
  );
}

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <article className="flex flex-col rounded-lg border border-fd-border bg-fd-card hover:bg-fd-muted transition-colors overflow-hidden">
      {/* Header */}
      <div className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-semibold text-fd-foreground leading-tight">
            {tool.name}
          </h3>
          <CategoryBadge category={tool.category} />
        </div>
        <p className="text-sm text-fd-muted-foreground leading-relaxed mb-3">
          {tool.tagline}
        </p>
        <p className="text-sm text-fd-foreground leading-relaxed">
          {tool.description}
        </p>
      </div>

      {/* Agent compatibility */}
      <div className="px-5 py-3 border-t border-fd-border">
        {tool.agents.length === 0 ? (
          <div className="flex items-center gap-2 text-sm text-fd-muted-foreground">
            <Clipboard className="w-4 h-4" />
            <span>Documentation only</span>
          </div>
        ) : (
          <div className="space-y-4">
            {tool.agents.map((agent) => (
              <AgentInstallBlock key={agent.id} agent={agent} />
            ))}
          </div>
        )}
      </div>

      {/* Footer links */}
      <div className="mt-auto px-5 py-3 border-t border-fd-border flex items-center justify-between">
        <Link
          href={tool.docsHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-fd-primary hover:opacity-80 transition-opacity"
        >
          <BookOpen className="w-4 h-4" />
          Documentation
          <span aria-hidden="true">→</span>
        </Link>
        {tool.githubUrl && (
          <a
            href={tool.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-fd-muted-foreground hover:text-fd-foreground transition-colors"
            aria-label={`${tool.name} on GitHub`}
          >
            <Github className="w-4 h-4" />
            <span className="sr-only">GitHub</span>
          </a>
        )}
      </div>
    </article>
  );
}
