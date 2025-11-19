import { FC, useRef } from "react";
import { Focusable, Navigation } from "@decky/ui";
import { Options, default as ReactMarkdown, Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownProps extends Omit<Options, 'children'> {
  onDismiss?: () => void;
  children: string;
}

export const Markdown: FC<MarkdownProps> = (props) => {
  return (
    // @ts-ignore
    <Focusable>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          div: (nodeProps: React.ComponentProps<'div'> & { node?: any }) => (
            // @ts-ignore
            <Focusable {...nodeProps.node?.properties}>
              {nodeProps.children}
            </Focusable>
          ),
          a: (nodeProps: React.ComponentProps<'a'> & { node?: any }) => {
            const aRef = useRef<HTMLAnchorElement>(null);
            return (
              // TODO fix focus ring
              // @ts-ignore
              <Focusable
                onActivate={() => {}}
                onOKButton={() => {
                  props.onDismiss?.();
                  Navigation.NavigateToExternalWeb(aRef.current!.href);
                }}
                style={{ display: "inline" }}
              >
                <a ref={aRef} {...nodeProps.node?.properties}>
                  {nodeProps.children}
                </a>
              </Focusable>
            );
          },
        } as Components}
        {...props}
      >
        {props.children}
      </ReactMarkdown>
    </Focusable>
  );
};
