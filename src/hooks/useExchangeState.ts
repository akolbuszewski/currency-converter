import {useReducer} from "react";
import {ExchangeState} from "../models/ExchangeState";

export const addSourceAction = (currency: string) => ({type: 'addSourceCurrency', currency}) as const;
export const addTargetAction = (currency: string) => ({type: 'addTargetCurrency', currency}) as const;
export const addAmountAction = (amount: number) => ({type: 'addAmount', amount}) as const;

type Action = ReturnType<typeof addSourceAction> | ReturnType<typeof addTargetAction> | ReturnType<typeof addAmountAction>;
function reducer(state: ExchangeState, action: Action) {
    switch (action?.type) {
        case 'addSourceCurrency':
            return {...state, sourceCurrency: action.currency};
        case 'addTargetCurrency':
            return {...state, targetCurrency: action.currency};
        case 'addAmount':
            return {...state, amount: action.amount};
        default:
            return state;
    }
}

const initialState: ExchangeState = {
    sourceCurrency: 'USD',
    targetCurrency: 'PLN',
    amount: 1
}
export function useExchangeState(): [ExchangeState, (action: Action) => void] {
    const [state, dispatch] = useReducer(reducer, initialState);

    return [state, dispatch];
}