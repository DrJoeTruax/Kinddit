"""Post endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from .. import schemas
from ..db import models
from ..dependencies import get_db

router = APIRouter(prefix="/posts", tags=["posts"])


@router.post("", response_model=schemas.PostOut, status_code=status.HTTP_201_CREATED)
def create_post(payload: schemas.PostCreate, db: Session = Depends(get_db)):
    community = db.query(models.Community).filter(models.Community.id == payload.community_id).first()
    if not community:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Community not found")
    post = models.Post(
        community_id=payload.community_id,
        user_id=payload.user_id,
        title=payload.title,
        body=payload.body,
        url=payload.url,
        media_ref=payload.media_ref,
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    return post


@router.get("", response_model=list[schemas.PostOut])
def list_posts(
    community_id: int | None = Query(default=None),
    db: Session = Depends(get_db),
):
    query = db.query(models.Post)
    if community_id is not None:
        query = query.filter(models.Post.community_id == community_id)
    return query.order_by(models.Post.created_at.desc()).limit(100).all()
