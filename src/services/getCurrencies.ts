import axios from "axios";
import {CurrencyData} from "../models/CurrencyData";
import {CurrencyBeaconResponse} from "../models/CurrencyBeaconResponse";

const CURRENCIES_ENDPOINT = 'https://api.currencybeacon.com/v1/currencies';
export async function getCurrencies(): Promise<Array<CurrencyData>> {
    const res = await axios.get<CurrencyBeaconResponse<Array<CurrencyData>>>(CURRENCIES_ENDPOINT, {
        params: {
            api_key: import.meta.env.VITE_API_KEY,
        }
    });
    return res.data.response;
}