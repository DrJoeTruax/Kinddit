export type UserSummary = {
  username: string;
  avatarUrl?: string;
  karma: number;
};

export type CommunitySummary = {
  name: string;
  slug: string;
  description: string;
  members: number;
  tags: string[];
  bannerUrl?: string;
};

export type Post = {
  id: string;
  title: string;
  body?: string;
  imageUrl?: string;
  url?: string;
  votes: number;
  comments: number;
  createdAt: string;
  author: UserSummary;
  community: CommunitySummary;
  flair?: string;
  view?: "card" | "compact";
  ticketSummary?: string;
  isLocked?: boolean;
};

export type Comment = {
  id: string;
  body: string;
  votes: number;
  createdAt: string;
  author: UserSummary;
  isLocked?: boolean;
  editedAt?: string;
  children?: Comment[];
};

export type Ticket = {
  id: string;
  targetType: "post" | "comment" | "user";
  status: "open" | "closed" | "in_review";
  reason: string;
  createdAt: string;
  summary?: string;
  link: string;
};

export type BlockEvent = {
  id: string;
  blocker: string;
  blocked: string;
  context: string;
  reason: string;
  createdAt: string;
};
