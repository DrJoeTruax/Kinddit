from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..kinddit.db import SessionLocal
from ..db.models import Post
from ..schemas import PostIn, PostOut
router = APIRouter(prefix="/posts", tags=["posts"])
def get_db(): db=SessionLocal(); try: yield db; finally: db.close()
@router.post("", response_model=PostOut)
def create(payload: PostIn, db: Session = Depends(get_db)):
    p = Post(**payload.model_dump()); db.add(p); db.commit(); db.refresh(p); return p
@router.get("", response_model=list[PostOut])
def list_(db: Session = Depends(get_db)):
    return db.query(Post).order_by(Post.id.desc()).limit(100).all()
