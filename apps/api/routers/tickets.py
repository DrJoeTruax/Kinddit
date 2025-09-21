"""Ticket endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from .. import schemas
from ..db import models
from ..dependencies import get_db

router = APIRouter(prefix="/tickets", tags=["tickets"])


@router.post("", response_model=schemas.TicketOut, status_code=status.HTTP_201_CREATED)
def create_ticket(payload: schemas.TicketCreate, db: Session = Depends(get_db)):
    if payload.kind not in {"crisis", "mod"}:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Unknown ticket kind")
    ticket = models.Ticket(
        kind=payload.kind,
        target_type=payload.target_type,
        target_id=payload.target_id,
    )
    db.add(ticket)
    db.commit()
    db.refresh(ticket)
    event = models.TicketEvent(
        ticket_id=ticket.id,
        actor_id=None,
        action="opened",
        payload_json={"kind": payload.kind},
    )
    db.add(event)
    db.commit()
    db.refresh(ticket)
    return ticket


@router.get("", response_model=list[schemas.TicketOut])
def list_tickets(db: Session = Depends(get_db)):
    return db.query(models.Ticket).order_by(models.Ticket.created_at.desc()).limit(100).all()
