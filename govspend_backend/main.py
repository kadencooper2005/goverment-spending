from fastapi import FastAPI
from govspend_backend.routers import spending
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
load_dotenv()


ursl = os.getenv("URL", "")
allowed_origins = [u.strips() for u in ursl.split(",") if u]

## Entry point for the API
app = FastAPI(title="GovSpend Intel API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(spending.router)