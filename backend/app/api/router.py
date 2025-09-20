from fastapi.routing import APIRouter

from app.db import check_db_health
from app.models.health import HealthcheckResponse, HealthStatus, DBStatus
from app.settings import settings

router = APIRouter()


@router.get("/health")
def health_check() -> HealthcheckResponse:
    """Health check endpoint."""
    db_healthy = check_db_health()

    return HealthcheckResponse(
        status=HealthStatus.HEALTHY if db_healthy else HealthStatus.UNHEALTHY,
        service=settings.app_name,
        version=settings.version,
        database=DBStatus.CONNECTED if db_healthy else DBStatus.DISCONNECTED,
    )
