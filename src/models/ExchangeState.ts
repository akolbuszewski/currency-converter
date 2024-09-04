export interface ExchangeState {
    sourceCurrency: string;
    targetCurrency: string;
    amount: number;
    convertedAmount?: number;
}