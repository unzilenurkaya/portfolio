import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { FaInfoCircle, FaExclamationTriangle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Custom components for MDX content
const components: MDXComponents = {
  // Headings with auto-generated IDs for TOC
  h1: ({ children, ...props }) => (
    <h1
      className="text-4xl md:text-5xl font-serif font-bold text-white mt-12 mb-8 first:mt-0 leading-tight"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => {
    const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    return (
      <h2
        id={id}
        className="text-3xl font-serif font-semibold text-white mt-12 mb-6 pb-2 border-b border-white/10 scroll-mt-32 leading-snug"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = children?.toString().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
    return (
      <h3
        id={id}
        className="text-2xl font-semibold text-white mt-10 mb-4 scroll-mt-32"
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => (
    <h4
      className="text-xl font-semibold text-white/90 mt-8 mb-3"
      {...props}
    >
      {children}
    </h4>
  ),

  // Paragraph with better readability
  p: ({ children, ...props }) => (
    <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light" {...props}>
      {children}
    </p>
  ),

  // Links with professional style
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http');

    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-secondary underline underline-offset-4 decoration-primary/30 hover:decoration-secondary transition-all"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href || '#'}
        className="text-primary hover:text-secondary underline underline-offset-4 decoration-primary/30 hover:decoration-secondary transition-all"
        {...props}
      >
        {children}
      </Link>
    );
  },

  // Lists with better spacing
  ul: ({ children, ...props }) => (
    <ul className="list-none space-y-4 mb-8 text-gray-300 pl-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal space-y-4 mb-8 text-gray-300 pl-6" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="flex items-start gap-3 leading-relaxed text-lg" {...props}>
      <span className="text-primary mt-1 text-sm">✦</span>
      <span>{children}</span>
    </li>
  ),

  // Blockquote - Professional Pull Quote style
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-primary pl-8 py-4 my-12 bg-white/5 rounded-r-3xl italic text-xl text-gray-200 font-serif leading-relaxed"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Code Styling
  code: ({ children, className, ...props }) => {
    const isInline = !className;

    if (isInline) {
      return (
        <code
          className="bg-primary/10 text-primary px-2 py-0.5 rounded-md text-[0.9em] font-mono border border-primary/20"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre
      className="bg-[#050505] border border-white/10 rounded-2xl p-6 overflow-x-auto mb-10 text-sm shadow-inner font-mono"
      {...props}
    >
      {children}
    </pre>
  ),

  // Horizontal rule
  hr: (props) => (
    <hr className="border-white/10 my-16" {...props} />
  ),

  // Strong & Emphasis
  strong: ({ children, ...props }) => (
    <strong className="font-bold text-white" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-gray-200" {...props}>
      {children}
    </em>
  ),

  // Professional Figure & Image
  img: ({ src, alt, ...props }) => (
    <figure className="my-12">
      <div className="rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
        <img
          src={src}
          alt={alt || ''}
          className="w-full h-auto object-cover"
          loading="lazy"
          {...props}
        />
      </div>
      {alt && (
        <figcaption className="text-center text-gray-500 text-sm mt-4 italic font-light tracking-wide">
          — {alt}
        </figcaption>
      )}
    </figure>
  ),

  // Table
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto mb-10 rounded-2xl border border-white/10">
      <table className="w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="bg-white/5 px-6 py-4 text-left text-white font-semibold border-b border-white/10"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="px-6 py-4 text-gray-300 border-b border-white/5 last:border-0"
      {...props}
    >
      {children}
    </td>
  ),
};

// Professional Callout component
export const Callout = ({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning' | 'success' | 'error';
  children: React.ReactNode;
}) => {
  const styles = {
    info: 'bg-blue-500/5 border-blue-500/20 text-blue-100',
    warning: 'bg-yellow-500/5 border-yellow-500/20 text-yellow-100',
    success: 'bg-green-500/5 border-green-500/20 text-green-100',
    error: 'bg-red-500/5 border-red-500/20 text-red-100',
  };

  const icons = {
    info: <FaInfoCircle className="text-blue-400" />,
    warning: <FaExclamationTriangle className="text-yellow-400" />,
    success: <FaCheckCircle className="text-green-400" />,
    error: <FaTimesCircle className="text-red-400" />,
  };

  return (
    <div className={`p-6 rounded-2xl border my-10 ${styles[type]} shadow-sm`}>
      <div className="flex items-start gap-4">
        <span className="text-2xl mt-0.5">{icons[type]}</span>
        <div className="prose-p:mb-0 prose-p:leading-relaxed">{children}</div>
      </div>
    </div>
  );
};

// Professional CodeBlock component with Copy button style (visually)
export const CodeBlock = ({
  language,
  filename,
  children,
}: {
  language?: string;
  filename?: string;
  children: React.ReactNode;
}) => (
  <div className="my-10 group">
    <div className="flex items-center justify-between bg-[#111] border border-white/10 border-b-0 rounded-t-2xl px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5 leading-none">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/30" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/30" />
        </div>
        {filename && (
          <span className="text-xs text-gray-500 font-mono ml-2">
            {filename}
          </span>
        )}
      </div>
      {language && (
        <span className="text-[10px] uppercase font-bold tracking-widest text-gray-600 bg-white/5 px-2 py-0.5 rounded border border-white/5">
          {language}
        </span>
      )}
    </div>
    <pre
      className={`bg-[#050505] border border-white/10 ${filename || language ? 'rounded-b-2xl' : 'rounded-2xl'
        } p-6 overflow-x-auto text-[13px] leading-relaxed font-mono shadow-2xl`}
    >
      <code className={language ? `language-${language}` : ''}>{children}</code>
    </pre>
  </div>
);

export default components;
