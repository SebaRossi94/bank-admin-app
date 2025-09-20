from collections.abc import Sequence
import logging

from fastapi import status
from fastapi.exceptions import HTTPException
from fastapi.routing import APIRouter
from sqlmodel import select

from app.db import session_dependency
from app.models.account import Account, AccountCreate

router = APIRouter(prefix="/accounts", tags=["accounts"])

logger = logging.getLogger(__name__)


@router.get("/")
def get_all_accounts(session: session_dependency) -> Sequence[Account]:
    """
    Get all accounts
    """
    all_accounts = session.exec(select(Account)).all()
    return all_accounts


@router.post("/")
def create_account(
    account_data: AccountCreate, session: session_dependency
) -> Account:
    """
    Create Account
    """
    created_account = Account(**account_data.model_dump())
    session.add(created_account)
    session.commit()
    session.refresh(created_account)
    return created_account


@router.get("/{account_id}")
def get_account_by_id(account_id: int, session: session_dependency) -> Account:
    print(id)
    account = session.exec(select(Account).where(Account.id == account_id)).first()
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Account not found"
        )
    return account
