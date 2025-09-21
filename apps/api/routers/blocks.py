"""Block endpoints implementing Block-Lock concepts."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import schemas
from ..db import models
from ..dependencies import get_db

router = APIRouter(prefix="/blocks", tags=["blocks"])


@router.post("", response_model=schemas.BlockOut, status_code=status.HTTP_201_CREATED)
def create_block(payload: schemas.BlockCreate, db: Session = Depends(get_db)):
    blocker = db.query(models.User).filter(models.User.id == payload.blocker_id).first()
    if not blocker:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Blocker not found")
    blocked_user = db.query(models.User).filter(models.User.id == payload.blocked_id).first()
    if not blocked_user:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="User not found")
    block = models.Block(
        blocker_id=payload.blocker_id,
        blocked_id=payload.blocked_id,
        context_type=payload.context_type,
        context_id=payload.context_id,
    )
    db.add(block)
    db.commit()
    db.refresh(block)
    return block


@router.get("", response_model=list[schemas.BlockOut])
def list_blocks(db: Session = Depends(get_db)):
    return db.query(models.Block).order_by(models.Block.created_at.desc()).limit(100).all()
