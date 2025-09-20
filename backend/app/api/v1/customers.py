from collections.abc import Sequence
import logging

from fastapi import status
from fastapi.exceptions import HTTPException
from fastapi.routing import APIRouter
from sqlmodel import select

from app.db import session_dependency
from app.models.customer import Customer, CustomerCreate

router = APIRouter(prefix="/customers", tags=["customers"])

logger = logging.getLogger(__name__)


@router.get("/")
def get_all_customers(session: session_dependency) -> Sequence[Customer]:
    """
    Get all customers
    """
    all_customers = session.exec(select(Customer)).all()
    return all_customers


@router.post("/")
def create_customer(
    customer_data: CustomerCreate, session: session_dependency
) -> Customer:
    """
    Create Customer
    """
    """
    Create a new user.
    """
    created_customer = Customer(**customer_data.model_dump())
    session.add(created_customer)
    session.commit()
    session.refresh(created_customer)
    return created_customer


@router.get("/{customer_id}")
def get_customer_by_id(customer_id: int, session: session_dependency) -> Customer:
    print(id)
    customer = session.exec(select(Customer).where(Customer.id == customer_id)).first()
    if not customer:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Customer not found"
        )
    return customer
