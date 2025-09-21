"""FastAPI application entrypoint."""

from fastapi import FastAPI

from .kinddit.plugins import load_safety_pack
from .routers import (
    blocks,
    comments,
    communities,
    consent_relay,
    me,
    posts,
    reports,
    tickets,
    users,
)

app = FastAPI(title="Kinddit API", version="0.1.0")

app.include_router(users.router)
app.include_router(communities.router)
app.include_router(posts.router)
app.include_router(comments.router)
app.include_router(reports.router)
app.include_router(blocks.router)
app.include_router(tickets.router)
app.include_router(consent_relay.router)
app.include_router(me.router)


@app.get("/health", tags=["system"])
def health_check():
    pack = load_safety_pack()
    return {"ok": True, "safety_pack": bool(pack)}
