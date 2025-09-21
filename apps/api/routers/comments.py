"""Comment endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import schemas
from ..db import models
from ..dependencies import get_db

router = APIRouter(prefix="/comments", tags=["comments"])


@router.post("", response_model=schemas.CommentOut, status_code=status.HTTP_201_CREATED)
def create_comment(payload: schemas.CommentCreate, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == payload.post_id).first()
    if not post:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Post not found")
    comment = models.Comment(
        post_id=payload.post_id,
        parent_id=payload.parent_id,
        body=payload.body,
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    revision = models.CommentRevision(comment_id=comment.id, body=payload.body)
    db.add(revision)
    db.commit()
    db.refresh(comment)
    return comment


@router.get("", response_model=list[schemas.CommentOut])
def list_comments(post_id: int | None = None, db: Session = Depends(get_db)):
    query = db.query(models.Comment)
    if post_id is not None:
        query = query.filter(models.Comment.post_id == post_id)
    return query.order_by(models.Comment.created_at.asc()).limit(500).all()
