from fastapi.routing import APIRouter

from .customers import router as customers_router
from .accounts import router as accounts_router

router = APIRouter(prefix="/v1", tags=["v1"])
router.include_router(customers_router)
router.include_router(accounts_router)
