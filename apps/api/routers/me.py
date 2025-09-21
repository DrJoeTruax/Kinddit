"""Account utilities endpoints."""

from fastapi import APIRouter, status

router = APIRouter(prefix="/me", tags=["me"])


@router.post("/export", status_code=status.HTTP_202_ACCEPTED)
def request_export():
    return {"status": "queued"}


@router.post("/delete", status_code=status.HTTP_202_ACCEPTED)
def request_delete():
    return {"status": "queued"}
