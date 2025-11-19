import { FC, useMemo, useEffect, useRef } from "react";
import { Navigation } from "@decky/ui";
import MarkdownIt from "markdown-it";
import taskLists from "markdown-it-task-lists";

interface MarkdownProps {
  onDismiss?: () => void;
  children: string;
}

export const Markdown: FC<MarkdownProps> = ({ children, onDismiss }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const md = useMemo(() => {
    return new MarkdownIt({
      html: false, // Disable HTML tags for security
      breaks: true, // Convert line breaks to <br>
      linkify: true, // Auto-detect links
    }).use(taskLists, { enabled: true });
  }, []);

  const htmlContent = useMemo(() => {
    return md.render(children || '');
  }, [md, children]);

  // Handle link clicks
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleLinkClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A') {
        e.preventDefault();
        const href = (target as HTMLAnchorElement).href;
        if (href) {
          onDismiss?.();
          Navigation.NavigateToExternalWeb(href);
        }
      }
    };

    container.addEventListener('click', handleLinkClick);
    return () => container.removeEventListener('click', handleLinkClick);
  }, [onDismiss]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        lineHeight: '1.5',
        wordWrap: 'break-word'
      }}
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
    />
  );
};
