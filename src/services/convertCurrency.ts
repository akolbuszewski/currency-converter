import axios from "axios";
import {CurrencyBeaconResponse} from "../models/CurrencyBeaconResponse";
import {ConvertCurrencyData} from "../models/ConvertCurrencyData";

const CONVERT_ENDPOINT = 'https://api.currencybeacon.com/v1/convert';

export async function convertCurrency(from: string, to: string, amount: number) {
    const res = await axios.get<CurrencyBeaconResponse<ConvertCurrencyData>>(CONVERT_ENDPOINT, {
        params: {
            api_key: import.meta.env.VITE_API_KEY,
            from,
            to,
            amount
        }
    });
    return res.data.response;
}