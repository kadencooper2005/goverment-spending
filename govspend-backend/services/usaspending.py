import httpx

BASE_URL = "https://api.usaspending.gov"

async def fetch_spending(year: int, agency: str, quarter: int = 4):
    url = f"{BASE_URL}/api/v2/spending/"

    payload = {
        "type": "agency",
        "filters": {
            "fy": year,
            "quarter": quarter
        }
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(url, json=payload)
        if response.status_code != 200:
            raise Exception(f"Failed to fetch spending data. Status code: {response.status_code}") 

        data = response.json()

        # Manual agency filtering
        agency = agency.lower()
        filtered = [
            item for item in data.get("results", [])
            if agency in item["name"].lower()
        ]
        return {"filtered_results": filtered}
