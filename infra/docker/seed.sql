INSERT INTO users (id, email, handle, created_at, status, karma)
VALUES (1, 'demo@kinddit.local', 'demo', NOW(), 'active', 1)
ON CONFLICT (id) DO NOTHING;

INSERT INTO profiles (user_id, bio, links)
VALUES (1, 'Safety-first moderator', 'https://kinddit.com')
ON CONFLICT (user_id) DO NOTHING;

INSERT INTO communities (id, name, slug, created_at)
VALUES (1, 'Kinddit Demo Community', 'demo', NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO posts (id, community_id, user_id, title, body, created_at)
VALUES (
  1,
  1,
  1,
  'Welcome to Kinddit',
  'This seeded post demonstrates the Kinddit safety-first stack.',
  NOW()
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO comments (id, post_id, user_id, body, created_at)
VALUES (1, 1, 1, 'Block-Lock keeps discussions healthy.', NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO tickets (id, kind, opener_id, target_type, target_id, state, created_at, updated_at)
VALUES (1, 'mod', 1, 'comment', 1, 'actioned', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public_summaries (id, ticket_id, summary, created_at)
VALUES (1, 1, 'Comment reviewed and acknowledged by moderators.', NOW())
ON CONFLICT (id) DO NOTHING;
