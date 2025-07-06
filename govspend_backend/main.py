from fastapi import FastAPI
from govspend_backend.routers import spending
from fastapi.middleware.cors import CORSMiddleware

## Entry point for the API
app = FastAPI(title="GovSpend Intel API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(spending.router)