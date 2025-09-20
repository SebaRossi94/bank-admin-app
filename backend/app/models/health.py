from enum import Enum

from app.db import SQLBaseModel


class HealthStatus(str, Enum):
    HEALTHY = "healthy"
    UNHEALTHY = "unhealthy"

class DBStatus(str, Enum):
    CONNECTED = "connected"
    DISCONNECTED = "disconnected"


class HealthcheckResponse(SQLBaseModel):
    status: HealthStatus
    service: str
    version: str
    database: str
