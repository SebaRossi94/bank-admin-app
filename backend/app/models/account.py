from decimal import Decimal
import uuid
from sqlmodel import Field, Relationship

from .customer import Customer
from app.db import SQLBaseModel, SQLBaseModelAudit


class Account(SQLBaseModelAudit, table=True):
    id: int = Field(default=None, primary_key=True)
    number: uuid.UUID = Field(default_factory=uuid.uuid4, unique=True, nullable=False)
    balance: Decimal = Field(default=0.00, ge=0.00, nullable=False, max_digits=15, decimal_places=2)
    customer_id: int = Field(foreign_key="customer.id", nullable=False)

    customer: Customer = Relationship(back_populates="accounts")

    outgoing_transferences: list["Transference"] = Relationship(
        back_populates="from_account",
        sa_relationship_kwargs={"foreign_keys": "[Transference.from_account_number]"}
    )
    incoming_transferences: list["Transference"] = Relationship(
        back_populates="to_account",
        sa_relationship_kwargs={"foreign_keys": "[Transference.to_account_number]"}
    )


class AccountCreate(SQLBaseModel):
    balance: float = Field(default=0.0, ge=0.0, nullable=False)
    customer_id: int


class AccountRead(SQLBaseModel):
    id: int = Field(default=None, primary_key=True)
    number: uuid.UUID = Field(default_factory=uuid.uuid4, unique=True, nullable=False)
    balance: float = Field(default=0.0, ge=0.0, nullable=False)
    customer_id: int = Field(foreign_key="customer.id", nullable=False)
