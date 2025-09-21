from decimal import Decimal
from typing import Self
import uuid
from pydantic import model_validator
from sqlmodel import Field, Relationship

from app.db import SQLBaseModel, SQLBaseModelAudit


class Transference(SQLBaseModelAudit, table=True):
    id: int = Field(default=None, primary_key=True)
    number: uuid.UUID = Field(default_factory=uuid.uuid4, unique=True, nullable=False)
    balance: Decimal = Field(default=0.00, ge=0.00, nullable=False, max_digits=15, decimal_places=2)
    from_account_number: uuid.UUID = Field(foreign_key="account.number", nullable=False)
    to_account_number: uuid.UUID = Field(foreign_key="account.number", nullable=False)

    from_account: "Account" = Relationship(
        back_populates="outgoing_transferences",
        sa_relationship_kwargs={"foreign_keys": "[Transference.from_account_number]"}
    )
    to_account: "Account" = Relationship(
        back_populates="incoming_transferences",
        sa_relationship_kwargs={"foreign_keys": "[Transference.to_account_number]"}
    )


class TransferenceRead(SQLBaseModel):
    id: int = Field(default=None, primary_key=True)
    number: uuid.UUID = Field(default_factory=uuid.uuid4, unique=True, nullable=False)
    balance: Decimal = Field(default=0.00, ge=0.00, nullable=False, max_digits=15, decimal_places=2)
    from_account_number: uuid.UUID = Field(foreign_key="account.number", nullable=False)
    to_account_number: uuid.UUID = Field(foreign_key="account.number", nullable=False)


class TransferenceCreate(SQLBaseModel):
    balance: Decimal = Field(default=0.00, gt=0.00, nullable=False, max_digits=15, decimal_places=2)
    from_account_number: uuid.UUID = Field(foreign_key="account.number", nullable=False)
    to_account_number: uuid.UUID = Field(foreign_key="account.number", nullable=False)

    @model_validator(mode="after")
    def validate_account_numbers(self) -> Self:
        if self.from_account_number == self.to_account_number:
            raise ValueError("From account number and to account number cannot be the same")
        return self