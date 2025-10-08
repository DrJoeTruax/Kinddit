export type BlockEvent = {
  blocker: string;
  blocked: string;
  context: string;
  reason: string;
  createdAt: string;
};

export function formatBlockContext(context: string) {
  if (!context) return "General";
  if (context.startsWith("post:")) {
    return `Post #${context.replace("post:", "")}`;
  }
  if (context.startsWith("comment:")) {
    return `Comment #${context.replace("comment:", "")}`;
  }
  return context;
}

export function summarizeBlocks(blocks: BlockEvent[]) {
  return blocks.map((block) => ({
    ...block,
    contextLabel: formatBlockContext(block.context)
  }));
}
