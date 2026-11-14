import type { Heading, Nodes, Paragraph, PhrasingContent, Root } from "mdast";

const NUMBER = /^(\d+(?:\.\d+)*)\.?(?:\s|$)/;

function textOf(node: PhrasingContent | undefined): string {
  if (!node) return "";
  if (node.type === "text" || node.type === "inlineCode") return node.value;
  return "children" in node ? node.children.map((child) => textOf(child)).join("") : "";
}

function anchorRule(paragraph: Paragraph) {
  const [first] = paragraph.children;
  if (first?.type !== "strong") return;
  const match = textOf(first).match(NUMBER);
  if (!match) return;
  const id = match[1];
  paragraph.data = { ...paragraph.data, hProperties: { id, className: ["rule"] } };
  paragraph.children[0] = { type: "link", url: `#${id}`, data: { hProperties: { className: ["rule-number"] } }, children: [first] };
}

function anchorHeading(heading: Heading) {
  const match = textOf(heading.children[0]).match(NUMBER);
  const last = heading.children.at(-1);
  if (!match || last?.type !== "text" || /\[#[^\]]+\]\s*$/.test(last.value)) return;
  last.value = `${last.value} [#${match[1]}]`;
}

function walk(node: Nodes) {
  if (node.type === "paragraph") anchorRule(node);
  else if (node.type === "heading") anchorHeading(node);
  if ("children" in node) for (const child of node.children) walk(child as Nodes);
}

export function remarkRules() {
  return (tree: Root) => walk(tree);
}
