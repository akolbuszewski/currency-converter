import {useData} from "./useData";
import {useEffect, useRef, useState} from "react";
import {convertCurrency} from "../services/convertCurrency";
import {debounce} from "lodash";
import {ConvertCurrencyData} from "../models/ConvertCurrencyData";

export function useConvertData(from: string, to: string, amount: number) {
    const [p, setP] = useState<Promise<ConvertCurrencyData>>();
    const debouncedConvert = useRef(
        debounce((from: string, to: string, amount: number) => {
            const promise = convertCurrency(from, to, amount);
            setP(promise);
        }, 300)
    );
    useEffect(() => {
        debouncedConvert.current(from, to, amount);
    }, [from, to, amount])
    // some checks may be added here to avoid ! usage
    return useData(p!);
}