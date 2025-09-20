from pydantic import EmailStr
from sqlmodel import Field, Relationship
from ..db import SQLBaseModel, SQLBaseModelAudit


class Customer(SQLBaseModelAudit, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    email: EmailStr = Field(unique=True)
    accounts: "Account" = Relationship(back_populates="customer")

class CustomerCreate(SQLBaseModel):
    name: str
    email: EmailStr = Field(unique=True)