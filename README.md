# Kinddit

**Kinddit** is an open-core, AGPL-3.0 licensed platform for public, safe-by-design communities.
- No DMs.
- All interactions are public or via Tickets.
- See [safety-pack](https://github.com/DrJoeTruax/safety-pack) for commercial extensions.

## Open-core model

- The core of Kinddit is fully open and free (AGPL-3.0).
- Advanced moderation, ML, and reputation features are available only via the proprietary [safety-pack](https://github.com/DrJoeTruax/safety-pack).

## Monorepo structure

```
/apps
  /frontend
  /api
/packages
  /shared
  /sdk
/infra
  /docker
  /terraform
/tests
```

## Community

- [Contributing](CONTRIBUTING.md)
- [Governance](GOVERNANCE.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Feature Matrix](FEATURE_GATES.md)

## License

AGPL-3.0 © [DrJoeTruax](https://github.com/DrJoeTruax)

---

## Kinddit MVP Scaffold

This repository now includes a Next.js 14 (App Router) scaffold styled with Tailwind, shadcn-inspired components, and Supabase-ready utilities so you can quickly iterate on the safety-first Reddit alternative described below. Use this as the foundation for shipping the production MVP.

### Getting Started (Next.js app)

```bash
pnpm install # or npm install / yarn install
pnpm dev
```

The development server runs on http://localhost:3000. Update the values in `.env.example` and copy them to `.env.local` once you connect your Supabase project.

---

Here is your **Lean V1 Copilot Master Brief — Kinddit (MVP Edition)**

It’s designed for **speed, polish, and validation**, using modern hosted tools:

* **Next.js 14 (App Router)**
* **Supabase (DB + Auth + Storage)**
* **Vercel (deploy)**
* **Tailwind + shadcn/ui** for a modern, Reddit-quality interface.

---

# **KINDDIT MVP — “Reddit, Reinvented Safely”**

## 🚀 Goal

Ship a **production-quality social platform MVP** in **2–4 weeks** that:

* Looks and feels like **Reddit’s new design**
* Removes all **toxic behaviors** (no DMs, full public visibility)
* Proves **Block-Lock**, **Tickets**, and **Transparency Safety** features
* Can reach **1,000 real users** for validation

---

## ⚙️ TECH STACK

| Layer               | Tech                                        | Reason                                          |
| ------------------- | ------------------------------------------- | ----------------------------------------------- |
| **Frontend + API**  | **Next.js 14 (App Router)**                 | Single framework, fast dev, serverless deploys  |
| **Database + Auth** | **Supabase**                                | Managed Postgres + built-in Auth                |
| **Hosting**         | **Vercel**                                  | Zero-config deploy, previews, SSL               |
| **UI**              | **TailwindCSS + shadcn/ui + Framer Motion** | Beautiful, responsive, and animated like Reddit |
| **Icons**           | **Lucide-react**                            | Crisp, open-source icons                        |
| **Image Uploads**   | Supabase Storage                            | Works like Reddit’s media                       |
| **Email Auth**      | Supabase Magic Links                        | Simple, secure                                  |
| **Analytics (opt)** | Posthog                                     | Track engagement post-launch                    |

---

## 🧠 CORE FEATURES (V1)

### 1. **Communities (like subreddits)**

* Create, join, browse communities
* Display banner, description, tags
* List of posts sorted by: Hot, New, Top, Rising

### 2. **Posts**

* Text, link, or image posts
* Voting (upvote/downvote)
* Share + Report + Save buttons
* Compact + Card views (like Reddit’s toggle)
* Markdown support

### 3. **Comments**

* Nested threads with reply UI
* Vote on comments
* Show “edited” history
* Smart collapse and smooth animations

### 4. **Block-Lock System (Safety MVP Feature)**

* When User A blocks User B:

  * B’s comments in that thread become **uneditable**
  * A can still reply to others below that chain
  * B can post elsewhere normally
* Locked comments get subtle “Locked due to abuse” indicator
* All block actions logged publicly in a user’s **Transparency Tab**

### 5. **Tickets (Public Transparency System)**

* Any user can file a **Ticket** on content or user behavior
* Options: “Harassment”, “Spam”, “Other”
* Tickets visible under a **public ticket log**
* When closed → a **Public Summary Card** appears under the original post/comment
  *(“This post was reviewed for harassment. No action taken.”)*

### 6. **Profiles**

* Username, bio, joined date, total karma
* Public “Transparency Tab” showing their:

  * Tickets filed
  * Tickets received
  * Blocks issued
  * Blocked by count (aggregate only)

### 7. **AutoModerator (Basic)**

* Keyword rule list per community (regex support)
* Actions: remove, delay, flag
* Rule visualization in community settings

### 8. **No DMs, Ever**

* All interactions are public
* Removes 90% of manipulation and shadow abuse vectors

---

## 💅 DESIGN & UX REQUIREMENTS

### Aesthetic

* **Color palette:** Teal primary (#0EA5A4), white surfaces, slate-gray text, and minimal gradients.
* **Typography:** Inter + Manrope
* **Spacing:** Generous padding and whitespace — **Reddit’s new design but less cramped.**
* **Rounded cards** and **soft shadows** (Reddit 2023 visual style)
* **Dark mode** by default with toggle
* Animations: subtle fades and slide-ins via Framer Motion

### Components

* **Navbar:** Logo (heart+K), search, profile, notifications, “+ Create”
* **Left sidebar:** Communities, Explore, Tickets
* **Right sidebar:** Top posts, trending communities
* **Post cards:** Rounded, hover lift, inline comment preview
* **Comment tree:** Reddit-style indent lines + smooth expand/collapse
* **Block-Lock indicator:** Small padlock icon + tooltip
* **Tickets:** Inline summary cards styled like GitHub issues

---

## 🧩 DATABASE SCHEMA (Supabase)

| Table             | Fields                                                                          |
| ----------------- | ------------------------------------------------------------------------------- |
| **users**         | id, username, bio, avatar_url, created_at                                       |
| **communities**   | id, name, slug, description, rules_json, created_at                             |
| **posts**         | id, community_id, user_id, title, body, url, image_url, score, created_at       |
| **comments**      | id, post_id, parent_id, user_id, body, score, created_at, is_locked             |
| **blocks**        | id, blocker_id, blocked_id, context (post_id or comment_id), reason, created_at |
| **tickets**       | id, reporter_id, target_type, target_id, reason, status, summary, created_at    |
| **automod_rules** | id, community_id, rule_type, pattern, action, created_at                        |

---

## 🔐 AUTH (Supabase)

* Magic link login (no passwords)
* Users must verify email
* Store JWT in secure cookies
* Display “Anonymous” UI until signed in

---

## ⚡ DEPLOYMENT PLAN

**Local Dev:**

```bash
npx create-next-app@latest kinddit --typescript --tailwind
cd kinddit
npx shadcn-ui init
npm install lucide-react framer-motion @supabase/supabase-js
```

**Supabase Setup:**

```bash
npx supabase init
npx supabase link --project-ref your-ref
npx supabase db push
```

**Deploy:**

* Connect repo to **Vercel**
* Add Supabase keys in environment variables
* `vercel --prod`

---

## 🧰 FILE STRUCTURE

```
/app
  /layout.tsx
  /page.tsx                → Home feed
  /c/[slug]/page.tsx       → Community page
  /p/[id]/page.tsx         → Post detail
  /u/[username]/page.tsx   → Profile page
  /tickets/page.tsx        → Ticket dashboard
/components
  PostCard.tsx
  CommentTree.tsx
  BlockAction.tsx
  TicketCard.tsx
  Navbar.tsx
  Sidebar.tsx
  AutoModSettings.tsx
/lib
  supabaseClient.ts
  blockUtils.ts
  ticketUtils.ts
```

---

## 🧠 FUTURE-PROOF (V2–V3)

| Feature                | Description                                |
| ---------------------- | ------------------------------------------ |
| **Reputation graph**   | ML-driven karma accuracy                   |
| **Advanced AutoMod**   | NLP scoring of toxicity                    |
| **Real-time comments** | Websockets or Supabase Realtime            |
| **Safety dashboards**  | Aggregate metrics by community             |
| **Open-source split**  | AGPL public core + proprietary safety pack |

---

## ✅ MILESTONES

**Week 1–2:**

* Communities, posts, comments
* Auth + UI polish
* Basic Block-Lock logic

**Week 3–4:**

* Tickets + Transparency Tab
* AutoMod YAML rules
* Public launch on Vercel (kinddit.com)

---

## ✨ REQUIREMENTS SUMMARY FOR COPILOT

1. Create a **Next.js 14 + TypeScript** app.
2. Configure **Supabase** for DB + Auth.
3. Add **Tailwind + shadcn/ui + Framer Motion + Lucide-react**.
4. Scaffold all routes and components listed above.
5. Use the provided **DB schema**.
6. Add environment variables for Supabase.
7. Add favicon + heart+K logo.
8. Deploy preview-ready to **Vercel**.
9. Ensure responsiveness and dark/light theme.
10. Final app must look and feel **on par with Reddit’s 2023 redesign**.

---

## Supabase & Next.js Environment

- Copy `apps/api/.env.dev` to `.env` for local API development.
- Copy `apps/frontend/.env.dev` to `.env.local` for the monorepo Next.js example.
- Create a root-level `.env.local` for the App Router scaffold with the following values:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

---

## Deployment Targets

- Docker Compose definitions remain under `infra/docker/compose.yml` for local multi-service testing.
- CI is configured via `.github/workflows/ci.yml` (restored) and should be extended to cover both the API and frontend apps.

---

## Contributing

Please read the restored community documents before contributing changes. When opening pull requests, resolve merge conflicts locally and ensure the CI workflow passes.

