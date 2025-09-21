"""Report endpoints."""

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from .. import schemas
from ..db import models
from ..dependencies import get_db

router = APIRouter(prefix="/reports", tags=["reports"])


@router.post("", response_model=schemas.ReportOut, status_code=status.HTTP_201_CREATED)
def create_report(payload: schemas.ReportCreate, db: Session = Depends(get_db)):
    report = models.Report(
        reporter_id=payload.reporter_id,
        target_type=payload.target_type,
        target_id=payload.target_id,
        reason=payload.reason,
        details=payload.details,
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    return report


@router.get("", response_model=list[schemas.ReportOut])
def list_reports(db: Session = Depends(get_db)):
    return db.query(models.Report).order_by(models.Report.created_at.desc()).limit(100).all()
