from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..kinddit.db import SessionLocal
from ..db.models import Community
from ..schemas import CommunityIn, CommunityOut
router = APIRouter(prefix="/communities", tags=["communities"])
def get_db(): db=SessionLocal(); try: yield db; finally: db.close()
@router.post("", response_model=CommunityOut)
def create(payload: CommunityIn, db: Session = Depends(get_db)):
    if db.query(Community).filter_by(name=payload.name).first(): raise HTTPException(409,"name taken")
    c = Community(name=payload.name, title=payload.title); db.add(c); db.commit(); db.refresh(c); return c
@router.get("", response_model=list[CommunityOut])
def list_(db: Session = Depends(get_db)):
    return db.query(Community).order_by(Community.id.desc()).limit(100).all()
