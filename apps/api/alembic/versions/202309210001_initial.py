"""Initial schema."""

from alembic import op
import sqlalchemy as sa

revision = "202309210001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("email", sa.String(length=320), nullable=False),
        sa.Column("handle", sa.String(length=32), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("status", sa.String(length=32), nullable=False, server_default="active"),
        sa.Column("karma", sa.Integer(), nullable=False, server_default="0"),
        sa.UniqueConstraint("email"),
        sa.UniqueConstraint("handle"),
    )
    op.create_index(op.f("ix_users_email"), "users", ["email"], unique=True)
    op.create_index(op.f("ix_users_handle"), "users", ["handle"], unique=True)
    op.create_index(op.f("ix_users_created_at"), "users", ["created_at"], unique=False)

    op.create_table(
        "profiles",
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("bio", sa.Text(), nullable=True),
        sa.Column("links", sa.Text(), nullable=True),
        sa.Column("settings_json", sa.JSON(), nullable=True),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("user_id"),
    )

    op.create_table(
        "communities",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=140), nullable=False),
        sa.Column("slug", sa.String(length=64), nullable=False),
        sa.Column("rules_json", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.UniqueConstraint("slug"),
    )
    op.create_index(op.f("ix_communities_slug"), "communities", ["slug"], unique=True)
    op.create_index(op.f("ix_communities_created_at"), "communities", ["created_at"], unique=False)

    op.create_table(
        "posts",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("community_id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.Column("title", sa.String(length=300), nullable=False),
        sa.Column("body", sa.Text(), nullable=True),
        sa.Column("url", sa.Text(), nullable=True),
        sa.Column("media_ref", sa.Text(), nullable=True),
        sa.Column("score", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["community_id"], ["communities.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="SET NULL"),
    )
    op.create_index(op.f("ix_posts_community_id"), "posts", ["community_id"], unique=False)
    op.create_index(op.f("ix_posts_user_id"), "posts", ["user_id"], unique=False)
    op.create_index(op.f("ix_posts_created_at"), "posts", ["created_at"], unique=False)
    op.create_index(op.f("ix_posts_score"), "posts", ["score"], unique=False)

    op.create_table(
        "comments",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("post_id", sa.Integer(), nullable=False),
        sa.Column("parent_id", sa.Integer(), nullable=True),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.Column("body", sa.Text(), nullable=False),
        sa.Column("score", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["parent_id"], ["comments.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["post_id"], ["posts.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="SET NULL"),
    )
    op.create_index(op.f("ix_comments_post_id"), "comments", ["post_id"], unique=False)
    op.create_index(op.f("ix_comments_parent_id"), "comments", ["parent_id"], unique=False)
    op.create_index(op.f("ix_comments_user_id"), "comments", ["user_id"], unique=False)
    op.create_index(op.f("ix_comments_created_at"), "comments", ["created_at"], unique=False)

    op.create_table(
        "comment_revisions",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("comment_id", sa.Integer(), nullable=False),
        sa.Column("body", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["comment_id"], ["comments.id"], ondelete="CASCADE"),
    )
    op.create_index(op.f("ix_comment_revisions_comment_id"), "comment_revisions", ["comment_id"], unique=False)
    op.create_index(op.f("ix_comment_revisions_created_at"), "comment_revisions", ["created_at"], unique=False)

    op.create_table(
        "votes",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("target_type", sa.String(length=24), nullable=False),
        sa.Column("target_id", sa.Integer(), nullable=False),
        sa.Column("value", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
    )
    op.create_index(op.f("ix_votes_user_id"), "votes", ["user_id"], unique=False)
    op.create_index(op.f("ix_votes_target"), "votes", ["target_type", "target_id"], unique=False)
    op.create_index(op.f("ix_votes_created_at"), "votes", ["created_at"], unique=False)

    op.create_table(
        "reports",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("reporter_id", sa.Integer(), nullable=True),
        sa.Column("target_type", sa.String(length=32), nullable=False),
        sa.Column("target_id", sa.Integer(), nullable=False),
        sa.Column("reason", sa.String(length=128), nullable=False),
        sa.Column("details", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("state", sa.String(length=32), nullable=False, server_default="open"),
        sa.ForeignKeyConstraint(["reporter_id"], ["users.id"], ondelete="SET NULL"),
    )
    op.create_index(op.f("ix_reports_reporter_id"), "reports", ["reporter_id"], unique=False)
    op.create_index(op.f("ix_reports_target"), "reports", ["target_type", "target_id"], unique=False)
    op.create_index(op.f("ix_reports_created_at"), "reports", ["created_at"], unique=False)
    op.create_index(op.f("ix_reports_state"), "reports", ["state"], unique=False)

    op.create_table(
        "blocks",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("blocker_id", sa.Integer(), nullable=False),
        sa.Column("blocked_id", sa.Integer(), nullable=False),
        sa.Column("context_type", sa.String(length=32), nullable=False),
        sa.Column("context_id", sa.Integer(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["blocked_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["blocker_id"], ["users.id"], ondelete="CASCADE"),
    )
    op.create_index(op.f("ix_blocks_blocker_id"), "blocks", ["blocker_id"], unique=False)
    op.create_index(op.f("ix_blocks_blocked_id"), "blocks", ["blocked_id"], unique=False)
    op.create_index(op.f("ix_blocks_context"), "blocks", ["context_type", "context_id"], unique=False)
    op.create_index(op.f("ix_blocks_created_at"), "blocks", ["created_at"], unique=False)

    op.create_table(
        "interaction_bans",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("community_id", sa.Integer(), nullable=True),
        sa.Column("scope_json", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("expires_at", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(["community_id"], ["communities.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
    )
    op.create_index(op.f("ix_interaction_bans_user_id"), "interaction_bans", ["user_id"], unique=False)
    op.create_index(op.f("ix_interaction_bans_community_id"), "interaction_bans", ["community_id"], unique=False)
    op.create_index(op.f("ix_interaction_bans_created_at"), "interaction_bans", ["created_at"], unique=False)
    op.create_index(op.f("ix_interaction_bans_expires_at"), "interaction_bans", ["expires_at"], unique=False)

    op.create_table(
        "comment_locks",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("comment_id", sa.Integer(), nullable=False),
        sa.Column("reason", sa.String(length=140), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["comment_id"], ["comments.id"], ondelete="CASCADE"),
    )
    op.create_index(op.f("ix_comment_locks_comment_id"), "comment_locks", ["comment_id"], unique=True)
    op.create_index(op.f("ix_comment_locks_created_at"), "comment_locks", ["created_at"], unique=False)

    op.create_table(
        "tickets",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("kind", sa.String(length=16), nullable=False),
        sa.Column("opener_id", sa.Integer(), nullable=True),
        sa.Column("target_type", sa.String(length=32), nullable=True),
        sa.Column("target_id", sa.Integer(), nullable=True),
        sa.Column("state", sa.String(length=32), nullable=False, server_default="open"),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["opener_id"], ["users.id"], ondelete="SET NULL"),
    )
    op.create_index(op.f("ix_tickets_kind"), "tickets", ["kind"], unique=False)
    op.create_index(op.f("ix_tickets_state"), "tickets", ["state"], unique=False)
    op.create_index(op.f("ix_tickets_created_at"), "tickets", ["created_at"], unique=False)

    op.create_table(
        "ticket_events",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("ticket_id", sa.Integer(), nullable=False),
        sa.Column("actor_id", sa.Integer(), nullable=True),
        sa.Column("action", sa.String(length=64), nullable=False),
        sa.Column("payload_json", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["actor_id"], ["users.id"], ondelete="SET NULL"),
        sa.ForeignKeyConstraint(["ticket_id"], ["tickets.id"], ondelete="CASCADE"),
    )
    op.create_index(op.f("ix_ticket_events_ticket_id"), "ticket_events", ["ticket_id"], unique=False)
    op.create_index(op.f("ix_ticket_events_created_at"), "ticket_events", ["created_at"], unique=False)

    op.create_table(
        "public_summaries",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("ticket_id", sa.Integer(), nullable=False),
        sa.Column("summary", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["ticket_id"], ["tickets.id"], ondelete="CASCADE"),
        sa.UniqueConstraint("ticket_id"),
    )
    op.create_index(op.f("ix_public_summaries_ticket_id"), "public_summaries", ["ticket_id"], unique=True)

    op.create_table(
        "consent_relays",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("opener_id", sa.Integer(), nullable=False),
        sa.Column("responder_id", sa.Integer(), nullable=True),
        sa.Column("token", sa.String(length=128), nullable=False),
        sa.Column("state", sa.String(length=32), nullable=False, server_default="pending"),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.Column("expires_at", sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(["opener_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["responder_id"], ["users.id"], ondelete="SET NULL"),
    )
    op.create_index(op.f("ix_consent_relays_token"), "consent_relays", ["token"], unique=True)
    op.create_index(op.f("ix_consent_relays_state"), "consent_relays", ["state"], unique=False)
    op.create_index(op.f("ix_consent_relays_created_at"), "consent_relays", ["created_at"], unique=False)

    op.create_table(
        "audit_log",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("actor_id", sa.Integer(), nullable=True),
        sa.Column("action", sa.String(length=64), nullable=False),
        sa.Column("entity_type", sa.String(length=32), nullable=False),
        sa.Column("entity_id", sa.Integer(), nullable=True),
        sa.Column("meta_json", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["actor_id"], ["users.id"], ondelete="SET NULL"),
    )
    op.create_index(op.f("ix_audit_log_actor_id"), "audit_log", ["actor_id"], unique=False)
    op.create_index(op.f("ix_audit_log_action"), "audit_log", ["action"], unique=False)
    op.create_index(op.f("ix_audit_log_entity"), "audit_log", ["entity_type", "entity_id"], unique=False)
    op.create_index(op.f("ix_audit_log_created_at"), "audit_log", ["created_at"], unique=False)


def downgrade() -> None:
    tables = [
        "audit_log",
        "consent_relays",
        "public_summaries",
        "ticket_events",
        "tickets",
        "comment_locks",
        "interaction_bans",
        "blocks",
        "reports",
        "votes",
        "comment_revisions",
        "comments",
        "posts",
        "communities",
        "profiles",
        "users",
    ]
    for table in tables:
        op.drop_table(table)
