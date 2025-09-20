import uuid
from sqlmodel import Field, Relationship

from .customer import Customer
from app.db import SQLBaseModel, SQLBaseModelAudit


class Account(SQLBaseModelAudit, table=True):
    id: int = Field(default=None, primary_key=True)
    number: uuid.UUID = Field(default_factory=uuid.uuid4, unique=True, nullable=False)
    balance: float = Field(default=0.0, ge=0.0, nullable=False)
    customer_id: int = Field(foreign_key="customer.id", nullable=False)
    customer: Customer = Relationship(back_populates="accounts")


class AccountCreate(SQLBaseModel):
    balance: float = Field(default=0.0, ge=0.0, nullable=False)
    customer_id: int

class AccountRead(SQLBaseModel):
    id: int = Field(default=None, primary_key=True)
    number: uuid.UUID = Field(default_factory=uuid.uuid4, unique=True, nullable=False)
    balance: float = Field(default=0.0, ge=0.0, nullable=False)
    customer_id: int = Field(foreign_key="customer.id", nullable=False)
