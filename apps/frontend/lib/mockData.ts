import { type BlockEvent, type Comment, type CommunitySummary, type Post, type Ticket, type UserSummary } from "./types";

const users: Record<string, UserSummary> = {
  aria: { username: "aria", karma: 1204, avatarUrl: "https://avatars.dicebear.com/api/initials/aria.svg" },
  nikhil: { username: "nikhil", karma: 987, avatarUrl: "https://avatars.dicebear.com/api/initials/nikhil.svg" },
  jules: { username: "jules", karma: 421, avatarUrl: "https://avatars.dicebear.com/api/initials/jules.svg" },
  mei: { username: "mei", karma: 2330, avatarUrl: "https://avatars.dicebear.com/api/initials/mei.svg" }
};

export const communities: CommunitySummary[] = [
  {
    name: "Product Safety",
    slug: "product-safety",
    description: "Designing safer, transparent online communities.",
    members: 28342,
    tags: ["research", "moderation", "ux"],
    bannerUrl: "/images/banners/product-safety.jpg"
  },
  {
    name: "Kindness Club",
    slug: "kindness-club",
    description: "Daily stories of community wins and mutual aid.",
    members: 18763,
    tags: ["feel-good", "stories"],
    bannerUrl: "/images/banners/kindness-club.jpg"
  },
  {
    name: "Mod School",
    slug: "mod-school",
    description: "Playbooks for humane, effective moderation teams.",
    members: 9421,
    tags: ["moderation", "playbooks"],
    bannerUrl: "/images/banners/mod-school.jpg"
  }
];

export const posts: Post[] = [
  {
    id: "1",
    title: "Block-Lock beta shipped to 5 pilot communities",
    body: "Our first pilot shows a 32% drop in back-and-forth harassment loops. Here's how we instrumented the transparency log for moderators.",
    votes: 532,
    comments: 82,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    author: users.aria,
    community: communities[0],
    flair: "Product Update",
    ticketSummary: "Reviewed for harassment. No action taken."
  },
  {
    id: "2",
    title: "How we make Tickets public without doxxing victims",
    body: "The ticket summary card doubles as context for future readers, while keeping reporter emails private.",
    votes: 213,
    comments: 44,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    author: users.nikhil,
    community: communities[0],
    flair: "Deep Dive"
  },
  {
    id: "3",
    title: "Weekly kindness roundup — mentorship wins",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80",
    votes: 742,
    comments: 109,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    author: users.mei,
    community: communities[1],
    flair: "Community"
  },
  {
    id: "4",
    title: "AutoModerator YAML template for quick starts",
    url: "https://kinddit.dev/automod-yaml",
    votes: 94,
    comments: 11,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    author: users.jules,
    community: communities[2],
    flair: "Template",
    isLocked: true,
    ticketSummary: "Flagged for spam. Removed automatically."
  }
];

export const sampleComments: Comment[] = [
  {
    id: "c1",
    body: "This is the kind of transparency I'd love to see on every platform.",
    votes: 182,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    author: users.mei,
    children: [
      {
        id: "c1-1",
        body: "Same. The Block-Lock UI strikes a balance between accountability and empathy.",
        votes: 64,
        createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
        author: users.aria
      },
      {
        id: "c1-2",
        body: "There's still edge cases with shadow bans. Maybe a public appeals queue?",
        votes: 21,
        createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        author: users.nikhil,
        isLocked: true
      }
    ]
  },
  {
    id: "c2",
    body: "Love the YAML preview. Can we get a visual diff next?",
    votes: 47,
    createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    author: users.jules,
    editedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  }
];

export const tickets: Ticket[] = [
  {
    id: "TCK-2048",
    targetType: "post",
    status: "closed",
    reason: "Harassment",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    summary: "Reviewed by @safia. Warning issued.",
    link: "/p/1"
  },
  {
    id: "TCK-2055",
    targetType: "comment",
    status: "in_review",
    reason: "Spam",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    link: "/p/4"
  },
  {
    id: "TCK-2077",
    targetType: "user",
    status: "open",
    reason: "Coordinated brigading",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
    summary: "Awaiting reporter follow-up",
    link: "/tickets"
  }
];

export const blockEvents: BlockEvent[] = [
  {
    id: "BLK-102",
    blocker: "aria",
    blocked: "shadowfox",
    context: "Comment c1-2",
    reason: "Personal attacks",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
  },
  {
    id: "BLK-103",
    blocker: "mei",
    blocked: "anonymous123",
    context: "Post 4",
    reason: "Repeated spam",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString()
  }
];

export const profileSummary = {
  user: users.aria,
  bio: "Designing humane moderation systems at Kinddit.",
  joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 280).toISOString(),
  communities: [communities[0], communities[2]],
  transparency: {
    ticketsFiled: [tickets[0], tickets[2]],
    ticketsReceived: [tickets[1]],
    blocksIssued: blockEvents,
    blockedByCount: 1
  }
};
