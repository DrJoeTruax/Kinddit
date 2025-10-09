from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..kinddit.db import SessionLocal
from ..db.models import Comment
from ..schemas import CommentIn, CommentOut
router = APIRouter(prefix="/comments", tags=["comments"])
def get_db(): db=SessionLocal(); try: yield db; finally: db.close()
@router.post("", response_model=CommentOut)
def create(payload: CommentIn, db: Session = Depends(get_db)):
    c = Comment(**payload.model_dump()); db.add(c); db.commit(); db.refresh(c); return c
@router.get("", response_model=list[CommentOut])
def list_(db: Session = Depends(get_db)):
    return db.query(Comment).order_by(Comment.id.desc()).limit(100).all()
