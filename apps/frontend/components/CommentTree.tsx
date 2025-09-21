import { ReactNode } from "react";

export interface CommentNode {
  id: number;
  parentId: number | null;
  body: string;
  children?: CommentNode[];
}

function renderNodes(nodes: CommentNode[]): ReactNode {
  return nodes.map((node) => (
    <li key={node.id} className="space-y-2 border-l border-slate-800 pl-4">
      <p className="text-sm text-slate-200">{node.body}</p>
      {node.children && node.children.length > 0 && (
        <ul className="space-y-2">{renderNodes(node.children)}</ul>
      )}
    </li>
  ));
}

export function CommentTree({ comments }: { comments: CommentNode[] }) {
  return <ul className="space-y-3">{renderNodes(comments)}</ul>;
}
