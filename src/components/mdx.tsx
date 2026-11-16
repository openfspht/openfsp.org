import { Children, isValidElement, useId, type ReactNode } from "react";
import { useParams } from "@tanstack/react-router";
import { CodeBlock, Pre, type CodeBlockProps } from "fumadocs-ui/components/codeblock";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { AttestationVerifier } from "@/components/attestation-verifier";
import { Mermaid } from "@/components/mermaid";
import { asLocale } from "@/lib/i18n";

const codeLabel = { en: "Code: ", fr: "Code : " };

function contentText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child): string => {
      if (typeof child === "string" || typeof child === "number") return String(child);
      return isValidElement<{ children?: ReactNode }>(child)
        ? contentText(child.props.children)
        : "";
    })
    .join("");
}

function AccessibleCodeBlock(props: CodeBlockProps) {
  const id = useId();
  const { lang } = useParams({ strict: false }) as { lang?: string };
  return (
    <CodeBlock {...props} viewportProps={{ "aria-labelledby": id }}>
      <span id={id} className="sr-only">
        {props.title ??
          `${codeLabel[asLocale(lang)]}${contentText(props.children).trim().split("\n")[0].slice(0, 100)}`}
      </span>
      <Pre>{props.children}</Pre>
    </CodeBlock>
  );
}

export const mdxComponents: MDXComponents = {
  ...defaultMdxComponents,
  pre: AccessibleCodeBlock,
  Mermaid,
  AttestationVerifier,
};
