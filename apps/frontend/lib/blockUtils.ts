import { type BlockEvent, type Comment } from "./types";

export function isLocked(comment: Comment): boolean {
  if (comment.isLocked) return true;
  return comment.children?.some(isLocked) ?? false;
}

export function describeBlock(event: BlockEvent): string {
  return `${event.blocker} blocked ${event.blocked} for ${event.reason.toLowerCase()}`;
}
