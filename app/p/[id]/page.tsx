import { CommentTree, type CommentNode } from "@/components/CommentTree";
import { PostCard, type Post } from "@/components/PostCard";

const post: Post = {
  id: "p-101",
  title: "Block-Lock beta recap: 97% reduction in harassment escalations",
  community: "safety",
  author: "alex",
  createdAt: "2h ago",
  body: "The Block-Lock pilot prevented edit wars by freezing abusive branches without silencing entire conversations.",
  votes: 2431,
  comments: 182,
  ticketSummary: "Ticket #442 reviewed for harassment. Decision: Post restored with Block-Lock applied to offending branch."
};

const comments: CommentNode[] = [
  {
    id: "c-1",
    author: "mel",
    createdAt: "1h ago",
    body: "As a mod, Block-Lock means I can respond to other members without rewarding the abuser.",
    votes: 210,
    children: [
      {
        id: "c-1-1",
        author: "harper",
        createdAt: "45m ago",
        body: "Same experience! It keeps context intact for transparency logs.",
        votes: 88
      }
    ]
  },
  {
    id: "c-2",
    author: "blocked_user",
    createdAt: "30m ago",
    body: "This comment chain is frozen after being blocked for harassment.",
    votes: -12,
    isLocked: true,
    children: [
      {
        id: "c-2-1",
        author: "chris",
        createdAt: "28m ago",
        body: "Appreciate the transparency notice.",
        votes: 34
      }
    ]
  }
];

export default function PostPage() {
  return (
    <div className="space-y-8">
      <PostCard post={post} />
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-100">Comments</h2>
        <CommentTree comments={comments} />
      </section>
    </div>
  );
}
