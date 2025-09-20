from pydantic import EmailStr
from sqlmodel import Field
from ..db import SQLBaseModelAudit


class Customer(SQLBaseModelAudit, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str
    email: EmailStr = Field(unique=True)