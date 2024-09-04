import {useData} from "./useData";
import {getCurrencies} from "../services/getCurrencies";

const promise = getCurrencies();
export function useCurrenciesData(){
    return useData(promise);
}