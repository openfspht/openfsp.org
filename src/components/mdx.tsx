import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { AttestationVerifier } from "@/components/attestation-verifier";
import { Mermaid } from "@/components/mermaid";

export const mdxComponents: MDXComponents = {
  ...defaultMdxComponents,
  Mermaid,
  AttestationVerifier,
};
