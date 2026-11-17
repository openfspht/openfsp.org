import type { Heading, Nodes, Paragraph, PhrasingContent, Root, TableRow } from "mdast";

const NUMBER = /^(\d+(?:\.\d+)*)\.?(?:\s|$)/;
const PROBLEM_CODE = /^[a-z]+(?:-[a-z]+)+$/;

function textOf(node: PhrasingContent | undefined): string {
    if (!node) {
        return "";
    }
    if (node.type === "text" || node.type === "inlineCode") {
        return node.value;
    }
    return "children" in node ? node.children.map((child) => textOf(child)).join("") : "";
}

function anchorRule(paragraph: Paragraph) {
    const [first] = paragraph.children;
    if (first?.type !== "strong") {
        return;
    }
    const match = textOf(first).match(NUMBER);
    if (!match) {
        return;
    }
    const id = match[1];
    paragraph.data = { ...paragraph.data, hProperties: { id, className: ["rule"] } };
    paragraph.children[0] = {
        type: "link",
        url: `#${id}`,
        data: { hProperties: { className: ["rule-number"] } },
        children: [first],
    };
}

function anchorHeading(heading: Heading) {
    const match = textOf(heading.children[0]).match(NUMBER);
    if (!match) {
        return;
    }
    const last = heading.children.at(-1);
    if (last?.type === "text") {
        if (!/\[#[^\]]+\]\s*$/.test(last.value)) {
            last.value = `${last.value} [#${match[1]}]`;
        }
    } else {
        heading.children.push({ type: "text", value: ` [#${match[1]}]` });
    }
}

function anchorProblem(row: TableRow, seen: Set<string>) {
    const first = row.children[0]?.children[0];
    if (first?.type !== "inlineCode" || !PROBLEM_CODE.test(first.value) || seen.has(first.value)) {
        return;
    }
    seen.add(first.value);
    row.data = { ...row.data, hProperties: { id: first.value, className: ["problem"] } };
}

function walk(node: Nodes, seen: Set<string>) {
    if (node.type === "paragraph") {
        anchorRule(node);
    } else if (node.type === "heading") {
        anchorHeading(node);
    } else if (node.type === "tableRow") {
        anchorProblem(node, seen);
    }
    if ("children" in node) {
        for (const child of node.children) {
            walk(child as Nodes, seen);
        }
    }
}

export function remarkRules() {
    return (tree: Root) => walk(tree, new Set());
}
