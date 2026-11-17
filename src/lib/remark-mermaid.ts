import type { Code, Parent, Root, RootContent } from "mdast";

function toMermaid(node: Code): RootContent {
    return {
        type: "mdxJsxFlowElement",
        name: "Mermaid",
        attributes: [{ type: "mdxJsxAttribute", name: "chart", value: node.value }],
        children: [],
    } as unknown as RootContent;
}

function walk(parent: Parent) {
    parent.children = parent.children.map((child) =>
        child.type === "code" && child.lang === "mermaid" ? toMermaid(child) : child,
    ) as Parent["children"];
    for (const child of parent.children) {
        if ("children" in child) {
            walk(child as Parent);
        }
    }
}

export function remarkMermaid() {
    return (tree: Root) => walk(tree);
}
