import uuid
from sqlmodel import Field, Relationship

from app.db import SQLBaseModel, SQLBaseModelAudit
from app.models.account import Account


class Transference(SQLBaseModelAudit, table=True):
    id: int = Field(default=None, primary_key=True)
    number: uuid.UUID = Field(default_factory=uuid.uuid4, unique=True, nullable=False)
    balance: float = Field(default=0.0, ge=0.0, nullable=False)
    from_account_number: uuid.UUID = Field(foreign_key="account.number", nullable=False)
    to_account_number: uuid.UUID = Field(foreign_key="account.number", nullable=False)
    from_account: Account = Relationship(back_populates="outgoing_transferences")
    to_account: Account = Relationship(back_populates="incoming_transferences")

class TransferenceCreate(SQLBaseModel):
    balance: float = Field(default=0.0, ge=0.0, nullable=False)
    from_account_number: uuid.UUID = Field(foreign_key="account.number", nullable=False)
    to_account_number: uuid.UUID = Field(foreign_key="account.number", nullable=False)