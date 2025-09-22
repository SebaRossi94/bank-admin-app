from fastapi.exceptions import HTTPException
from fastapi.routing import APIRouter
from app.db import session_dependency
from app.models.transference import Transference, TransferenceCreate
from sqlmodel import select
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlmodel import paginate

from app.models.account import Account

router = APIRouter(prefix="/transferences", tags=["transferences"])


@router.get("/")
def get_all_transferences(session: session_dependency) -> Page[Transference]:
    """
    Get all transferences
    """
    all_transferences_query = select(Transference)
    response: Page[Transference] = paginate(session, all_transferences_query)
    return response


@router.post("/")
def create_transference(
    transference: TransferenceCreate, session: session_dependency
) -> Transference:
    """
    Create a transference
    """
    created_transference = Transference(**transference.model_dump())
    from_account = session.exec(
        select(Account).where(
            Account.number == created_transference.from_account_number
        )
    ).first()
    if not from_account:
        raise HTTPException(status_code=400, detail="From account not found")
    to_account = session.exec(
        select(Account).where(Account.number == created_transference.to_account_number)
    ).first()
    if not to_account:
        raise HTTPException(status_code=400, detail="To account not found")
    if from_account.balance < created_transference.balance:
        raise HTTPException(status_code=400, detail="Insufficient balance")
    from_account.balance -= created_transference.balance
    to_account.balance += created_transference.balance
    session.add(from_account)
    session.add(to_account)
    session.add(created_transference)
    session.commit()
    session.refresh(created_transference)
    return created_transference
