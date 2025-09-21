from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..kinddit.db import SessionLocal
from ..db.models import User
from ..schemas import UserIn, UserOut
router = APIRouter(prefix="/users", tags=["users"])
def get_db(): db=SessionLocal(); try: yield db; finally: db.close()
@router.post("", response_model=UserOut)
def create(payload: UserIn, db: Session = Depends(get_db)):
    u = User(handle=payload.handle); db.add(u); db.commit(); db.refresh(u); return u
@router.get("", response_model=list[UserOut])
def list_(db: Session = Depends(get_db)):
    return db.query(User).order_by(User.id.desc()).limit(100).all()
