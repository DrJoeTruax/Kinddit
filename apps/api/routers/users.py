"""User endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import schemas
from ..db import models
from ..dependencies import get_db

router = APIRouter(prefix="/users", tags=["users"])


@router.post("", response_model=schemas.UserOut, status_code=status.HTTP_201_CREATED)
def create_user(payload: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(
        (models.User.email == payload.email) | (models.User.handle == payload.handle)
    ).first()
    if existing:
        raise HTTPException(status.HTTP_409_CONFLICT, detail="User already exists")
    user = models.User(email=payload.email, handle=payload.handle)
    db.add(user)
    db.commit()
    db.refresh(user)
    profile = models.Profile(user_id=user.id)
    db.add(profile)
    db.commit()
    db.refresh(user)
    return user


@router.get("", response_model=list[schemas.UserOut])
def list_users(db: Session = Depends(get_db)):
    return db.query(models.User).order_by(models.User.id.desc()).limit(100).all()
