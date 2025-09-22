from fastapi import FastAPI
from fastapi_pagination import add_pagination
from app.api.router import router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
add_pagination(app)  # pyright: ignore[reportUnusedCallResult]

app.include_router(router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)