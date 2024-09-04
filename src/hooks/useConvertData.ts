import {useData} from "./useData";
import {useCallback, useEffect, useState} from "react";
import {convertCurrency} from "../services/convertCurrency";
import {debounce} from "lodash";
import {ConvertCurrencyData} from "../models/ConvertCurrencyData";

export function useConvertData(from: string, to: string, amount: number) {
    const [p, setP] = useState<Promise<ConvertCurrencyData>>();
    const debouncedSetP = useCallback(debounce(setP, 300), []);
    useEffect(() => {
        debouncedSetP(convertCurrency(from, to, amount));
    }, [from, to, amount])
    return useData(p!);
}