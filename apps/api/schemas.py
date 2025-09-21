"""Pydantic schemas for the Kinddit API."""

from __future__ import annotations

from datetime import datetime
from typing import Any

from pydantic import BaseModel, Field


class ORMModel(BaseModel):
    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    email: str = Field(..., max_length=320)
    handle: str = Field(..., min_length=3, max_length=32)


class UserOut(ORMModel):
    id: int
    email: str
    handle: str
    created_at: datetime
    status: str
    karma: int


class CommunityCreate(BaseModel):
    name: str = Field(..., max_length=140)
    slug: str = Field(..., min_length=3, max_length=64)


class CommunityOut(ORMModel):
    id: int
    name: str
    slug: str
    rules_json: dict[str, Any] | None
    created_at: datetime


class PostCreate(BaseModel):
    community_id: int
    user_id: int | None = None
    title: str = Field(..., max_length=300)
    body: str | None = None
    url: str | None = None
    media_ref: str | None = None


class PostOut(ORMModel):
    id: int
    community_id: int
    user_id: int | None
    title: str
    body: str | None
    url: str | None
    media_ref: str | None
    score: int
    created_at: datetime


class CommentCreate(BaseModel):
    post_id: int
    body: str
    parent_id: int | None = None


class CommentOut(ORMModel):
    id: int
    post_id: int
    parent_id: int | None
    user_id: int | None
    body: str
    score: int
    created_at: datetime


class ReportCreate(BaseModel):
    target_type: str = Field(..., max_length=32)
    target_id: int
    reason: str = Field(..., max_length=128)
    details: str | None = None
    reporter_id: int | None = None


class ReportOut(ORMModel):
    id: int
    reporter_id: int | None
    target_type: str
    target_id: int
    reason: str
    details: str | None
    state: str
    created_at: datetime


class BlockCreate(BaseModel):
    blocker_id: int
    blocked_id: int
    context_type: str = Field(..., max_length=32)
    context_id: int | None = None


class BlockOut(ORMModel):
    id: int
    blocker_id: int
    blocked_id: int
    context_type: str
    context_id: int | None
    created_at: datetime


class TicketCreate(BaseModel):
    kind: str = Field(..., max_length=16)
    target_type: str | None = None
    target_id: int | None = None


class TicketOut(ORMModel):
    id: int
    kind: str
    target_type: str | None
    target_id: int | None
    state: str
    created_at: datetime
    updated_at: datetime


class ConsentRelayCreate(BaseModel):
    opener_id: int
    responder_id: int | None = None


class ConsentRelayOut(ORMModel):
    id: int
    opener_id: int
    responder_id: int | None
    token: str
    state: str
    created_at: datetime
    expires_at: datetime | None
