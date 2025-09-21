"""Community endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import schemas
from ..db import models
from ..dependencies import get_db

router = APIRouter(prefix="/communities", tags=["communities"])


@router.post("", response_model=schemas.CommunityOut, status_code=status.HTTP_201_CREATED)
def create_community(payload: schemas.CommunityCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Community).filter(models.Community.slug == payload.slug).first()
    if existing:
        raise HTTPException(status.HTTP_409_CONFLICT, detail="Community slug already exists")
    community = models.Community(name=payload.name, slug=payload.slug)
    db.add(community)
    db.commit()
    db.refresh(community)
    return community


@router.get("", response_model=list[schemas.CommunityOut])
def list_communities(slug: str | None = None, db: Session = Depends(get_db)):
    query = db.query(models.Community)
    if slug:
        query = query.filter(models.Community.slug == slug)
    return query.order_by(models.Community.created_at.desc()).limit(100).all()
