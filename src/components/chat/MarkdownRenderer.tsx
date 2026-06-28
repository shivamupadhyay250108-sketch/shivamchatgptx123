import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check, ExternalLink } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
      code: CodeBlock as React.ComponentType<React.HTMLAttributes<HTMLElement> & { inline?: boolean }>,
      a: LinkComponent,
      ul: ListComponent,
      ol: OrderedListComponent,
      li: ListItemComponent,
      table: TableComponent,
      thead: TableHeadComponent,
      tbody: TableBodyComponent,
      tr: TableRowComponent,
      th: TableCellHeadComponent,
      td: TableCellComponent,
      p: ParagraphComponent,
      h1: (props) => HeadingComponent({ ...props, level: 1 }),
      h2: (props) => HeadingComponent({ ...props, level: 2 }),
      h3: (props) => HeadingComponent({ ...props, level: 3 }),
      h4: (props) => HeadingComponent({ ...props, level: 4 }),
      blockquote: BlockquoteComponent,
      strong: StrongComponent,
      em: EmphasisComponent,
    }}>
      {content}
    </ReactMarkdown>
  );
}

function CodeBlock({
  inline,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & { inline?: boolean }) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : '';
  const code = String(children).replace(/\n$/, '');

  if (inline) {
    return (
      <code
        className="rounded-lg bg-white/10 px-2 py-0.5 font-mono text-sm text-cyan-400"
        {...props}
      >
        {children}
      </code>
    );
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-xl overflow-hidden border border-white/10">
      {language && (
        <div className="flex items-center justify-between bg-white/5 px-4 py-2 border-b border-white/10">
          <span className="text-xs text-white/50 font-mono uppercase">{language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-white/50 hover:text-white transition"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
      <SyntaxHighlighter
        style={oneDark}
        language={language || 'text'}
        PreTag="div"
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'rgba(0, 0, 0, 0.3)',
          fontSize: '0.875rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

function LinkComponent({
  href,
  children,
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const isExternal = href?.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 hover:decoration-cyan-400 transition"
    >
      {children}
      {isExternal && <ExternalLink size={12} />}
    </a>
  );
}

function ListComponent({ children }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul className="my-3 ml-6 space-y-2 list-disc marker:text-cyan-400">
      {children}
    </ul>
  );
}

function OrderedListComponent({ children }: React.OlHTMLAttributes<HTMLOListElement>) {
  return (
    <ol className="my-3 ml-6 space-y-2 list-decimal marker:text-cyan-400">
      {children}
    </ol>
  );
}

function ListItemComponent({ children }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className="text-white/80 leading-relaxed">{children}</li>;
}

function TableComponent({ children }: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="my-4 overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

function TableHeadComponent({ children }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="bg-white/5">{children}</thead>;
}

function TableBodyComponent({ children }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="divide-y divide-white/10">{children}</tbody>;
}

function TableRowComponent({ children }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className="border-b border-white/10 last:border-0">{children}</tr>;
}

function TableCellHeadComponent({ children }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className="px-4 py-3 text-left font-semibold text-white whitespace-nowrap">
      {children}
    </th>
  );
}

function TableCellComponent({ children }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className="px-4 py-3 text-white/80">{children}</td>;
}

function ParagraphComponent({ children }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className="my-3 leading-relaxed text-white/80">{children}</p>;
}

function HeadingComponent({
  level,
  children,
}: React.HTMLAttributes<HTMLHeadingElement> & { level: number }) {
  const classes: Record<number, string> = {
    1: 'text-2xl font-bold mt-6 mb-4 text-white',
    2: 'text-xl font-bold mt-5 mb-3 text-white',
    3: 'text-lg font-semibold mt-4 mb-2 text-white',
    4: 'text-base font-semibold mt-3 mb-2 text-white',
  };

  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return <HeadingTag className={classes[level] || classes[1]}>{children}</HeadingTag>;
}

function BlockquoteComponent({ children }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote className="my-4 pl-4 border-l-4 border-cyan-500/50 bg-white/5 rounded-r-lg py-3 pr-4 italic text-white/70">
      {children}
    </blockquote>
  );
}

function StrongComponent({ children }: React.HTMLAttributes<HTMLElement>) {
  return <strong className="font-bold text-white">{children}</strong>;
}

function EmphasisComponent({ children }: React.HTMLAttributes<HTMLElement>) {
  return <em className="italic">{children}</em>;
}
