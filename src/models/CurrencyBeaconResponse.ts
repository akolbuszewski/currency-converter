export interface CurrencyBeaconResponse<T> {
    meta: {
        code: number;
        disclaimer: string;
    },
    response: T;
}