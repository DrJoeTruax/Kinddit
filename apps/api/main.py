from fastapi import FastAPI
from kinddit.plugins.loader import load_safety_pack
from .routers import users, communities, posts, comments
app = FastAPI(title="Kinddit API")
app.include_router(users.router); app.include_router(communities.router)
app.include_router(posts.router); app.include_router(comments.router)
@app.get("/health")
def health():
    pack = load_safety_pack()
    return {"ok": True, "safety_pack": "loaded" if pack else "absent"}
