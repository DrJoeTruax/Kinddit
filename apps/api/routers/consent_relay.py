"""Consent relay endpoints."""

import secrets
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import schemas
from ..db import models
from ..dependencies import get_db

router = APIRouter(prefix="/consent-relay", tags=["consent-relay"])


@router.post("", response_model=schemas.ConsentRelayOut, status_code=status.HTTP_201_CREATED)
def create_consent(payload: schemas.ConsentRelayCreate, db: Session = Depends(get_db)):
    token = secrets.token_urlsafe(24)
    opener = db.query(models.User).filter(models.User.id == payload.opener_id).first()
    if not opener:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Opener not found")
    if payload.responder_id is not None:
        responder = db.query(models.User).filter(models.User.id == payload.responder_id).first()
        if not responder:
            raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Responder not found")
    record = models.ConsentRelay(
        opener_id=payload.opener_id,
        responder_id=payload.responder_id,
        token=token,
        state="pending",
        expires_at=datetime.utcnow() + timedelta(days=7),
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


@router.get("", response_model=list[schemas.ConsentRelayOut])
def list_consent(db: Session = Depends(get_db)):
    return db.query(models.ConsentRelay).order_by(models.ConsentRelay.created_at.desc()).limit(50).all()
