import logging

from fastapi import status
from fastapi.exceptions import HTTPException
from fastapi.routing import APIRouter
from fastapi_pagination import Page
from fastapi_pagination.ext.sqlmodel import paginate
from sqlmodel import select

from app.db import session_dependency
from app.models.customer import Customer, CustomerCreate
from app.models.account import Account

router = APIRouter(prefix="/customers", tags=["customers"])

logger = logging.getLogger(__name__)


@router.get("/")
def get_all_customers(session: session_dependency) -> Page[Customer]:
    """
    Get all customers
    """
    all_customers_query = select(Customer)
    response: Page[Customer] = paginate(session, all_customers_query)
    return response


@router.post("/")
def create_customer(
    customer_data: CustomerCreate, session: session_dependency
) -> Customer:
    """
    Create Customer
    """
    created_customer = Customer(**customer_data.model_dump())
    session.add(created_customer)
    session.commit()
    session.refresh(created_customer)
    return created_customer


@router.get("/{customer_id}")
def get_customer_by_id(customer_id: int, session: session_dependency) -> Customer:
    """
    Get customer by id
    """
    customer = session.exec(select(Customer).where(Customer.id == customer_id)).first()
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found"
        )
    return customer

@router.get("/{customer_id}/accounts")
def get_customer_accounts(customer_id: int, session: session_dependency) -> Page[Account]:
    """
    Get customer accounts by customer id
    """
    accounts_query = select(Account).where(Account.customer_id == customer_id)
    response: Page[Account] = paginate(session, accounts_query)
    return response
