export async function fetchSpendingData(year: number, quarter: number, agency: string) {
    const res = await fetch(`http://localhost:8000/spending/?year=${year}&quarter=${quarter}&agency=${agency}`);
    if (!res.ok) {
        throw new Error("Failed to fetch spending data");
    }
    return res.json();
}