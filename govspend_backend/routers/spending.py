from fastapi import APIRouter, Query
from services.usaspending import fetch_spending

router = APIRouter(prefix="/spending", tags=['Spending'])


# Create a GET endpoint to fetch spending data
@router.get("/")
async def get_spending_data(
    year: int = Query(...),
    agency: str = Query(...),
    quarter: int = Query(4, ge=1, le=4)
):
    return await fetch_spending(year=year,quarter=quarter, agency=agency)



