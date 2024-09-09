export interface HistoryEntrance {

        sourceCurrency: string;
        targetCurrency: string;
        amount: number;
        convertedAmount?: number;
        timestamp: number;

}
export interface ExchangeState {
    sourceCurrency: string;
    targetCurrency: string;
    amount: number;
    convertedAmount?: number;
    history: Array<HistoryEntrance>
}