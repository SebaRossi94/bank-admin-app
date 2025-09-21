from collections.abc import Sequence
import logging
import uuid

from fastapi import status
from fastapi.exceptions import HTTPException
from fastapi.routing import APIRouter
from sqlmodel import select, or_

from app.db import session_dependency
from app.models.account import Account, AccountCreate, AccountRead
from app.models.transference import Transference, TransferenceRead
from app.models.customer import Customer

router = APIRouter(prefix="/accounts", tags=["accounts"])

logger = logging.getLogger(__name__)


@router.get("/", response_model=Sequence[AccountRead])
def get_all_accounts(session: session_dependency) -> Sequence[Account]:
    """
    Get all accounts
    """
    all_accounts = session.exec(select(Account)).all()
    return all_accounts


@router.post("/")
def create_account(account_data: AccountCreate, session: session_dependency) -> Account:
    """
    Create Account
    """
    customer = session.exec(
        select(Customer).where(Customer.id == account_data.customer_id)
    ).first()
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found"
        )
    created_account = Account(**account_data.model_dump())
    session.add(created_account)
    session.commit()
    session.refresh(created_account)
    return created_account


@router.get("/{account_id}", response_model=AccountRead)
def get_account_by_id(account_id: int, session: session_dependency) -> Account:
    """
    Get account by id
    """
    account = session.exec(select(Account).where(Account.id == account_id)).first()
    if not account:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Account not found"
        )
    return account


@router.get("/{account_number}/transferences", response_model=Sequence[TransferenceRead])
def get_account_transferences_by_id(
    account_id: uuid.UUID, session: session_dependency
) -> Sequence[Transference]:
    """
    Get account transferences by account number
    """
    account_transferences = session.exec(
        select(Transference).where(
            or_(
                Transference.from_account_number == account_id,
                Transference.to_account_number == account_id,
            )
        )
    ).all()
    return account_transferences
