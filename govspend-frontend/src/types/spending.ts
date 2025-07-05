// types/spending.ts
export interface SpendingResult {
    name: string;
    id: string;
    amount: number;
    type: string;
    code: string;
}

export interface SpendingResponse {
    filtered_results: SpendingResult[];
}
