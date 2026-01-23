import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

// Custom components for MDX content
const components: MDXComponents = {
  // Headings
  h1: ({ children, ...props }) => (
    <h1
      className="text-4xl font-serif font-bold text-white mt-10 mb-6 first:mt-0"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="text-3xl font-serif font-semibold text-white mt-10 mb-4 pb-2 border-b border-white/10"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="text-2xl font-semibold text-white mt-8 mb-3"
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="text-xl font-semibold text-white/90 mt-6 mb-2"
      {...props}
    >
      {children}
    </h4>
  ),

  // Paragraph
  p: ({ children, ...props }) => (
    <p className="text-gray-300 leading-relaxed mb-6" {...props}>
      {children}
    </p>
  ),

  // Links
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith('http');
    
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-secondary underline underline-offset-4 transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href || '#'}
        className="text-primary hover:text-secondary underline underline-offset-4 transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  },

  // Lists
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside space-y-2 mb-6 text-gray-300 pl-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-300 pl-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),

  // Blockquote
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-primary pl-6 py-2 my-6 bg-white/5 rounded-r-xl italic text-gray-300"
      {...props}
    >
      {children}
    </blockquote>
  ),

  // Code
  code: ({ children, className, ...props }) => {
    const isInline = !className;
    
    if (isInline) {
      return (
        <code
          className="bg-white/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono"
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
      className="bg-[#1a1a1a] border border-white/10 rounded-xl p-4 overflow-x-auto mb-6 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),

  // Horizontal rule
  hr: (props) => (
    <hr className="border-white/10 my-10" {...props} />
  ),

  // Strong & Emphasis
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-white" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-gray-200" {...props}>
      {children}
    </em>
  ),

  // Images
  img: ({ src, alt, ...props }) => (
    <figure className="my-8">
      <img
        src={src}
        alt={alt || ''}
        className="w-full rounded-2xl border border-white/10"
        loading="lazy"
        {...props}
      />
      {alt && (
        <figcaption className="text-center text-gray-500 text-sm mt-3 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  ),

  // Table
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto mb-6">
      <table className="w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }) => (
    <th
      className="border border-white/10 bg-white/5 px-4 py-2 text-left text-white font-semibold"
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td
      className="border border-white/10 px-4 py-2 text-gray-300"
      {...props}
    >
      {children}
    </td>
  ),
};

// Custom components for use in MDX files
export const Callout = ({
  type = 'info',
  children,
}: {
  type?: 'info' | 'warning' | 'success' | 'error';
  children: React.ReactNode;
}) => {
  const styles = {
    info: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    warning: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-300',
    success: 'bg-green-500/10 border-green-500/30 text-green-300',
    error: 'bg-red-500/10 border-red-500/30 text-red-300',
  };

  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✅',
    error: '❌',
  };

  return (
    <div className={`p-4 rounded-xl border my-6 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-xl">{icons[type]}</span>
        <div>{children}</div>
      </div>
    </div>
  );
};

export const CodeBlock = ({
  language,
  filename,
  children,
}: {
  language?: string;
  filename?: string;
  children: React.ReactNode;
}) => (
  <div className="my-6">
    {filename && (
      <div className="bg-white/5 border border-white/10 border-b-0 rounded-t-xl px-4 py-2 text-sm text-gray-400 font-mono">
        {filename}
      </div>
    )}
    <pre
      className={`bg-[#1a1a1a] border border-white/10 ${
        filename ? 'rounded-b-xl' : 'rounded-xl'
      } p-4 overflow-x-auto text-sm`}
    >
      <code className={language ? `language-${language}` : ''}>{children}</code>
    </pre>
  </div>
);

export default components;
