import {useReducer} from "react";
import {ExchangeState, HistoryEntrance} from "../models/ExchangeState";

export const addSourceAction = (currency: string) => ({type: 'addSourceCurrency', currency}) as const;
export const addTargetAction = (currency: string) => ({type: 'addTargetCurrency', currency}) as const;
export const addAmountAction = (amount: number) => ({type: 'addAmount', amount}) as const;
export const addHistoryAction = (historyEntrance: HistoryEntrance) => ({type: 'addHistory', historyEntrance}) as const;

type Action =
    ReturnType<typeof addSourceAction>
    | ReturnType<typeof addTargetAction>
    | ReturnType<typeof addAmountAction>
    | ReturnType<typeof addHistoryAction>;

function reducer(state: ExchangeState, action: Action) {
    switch (action?.type) {
        case 'addSourceCurrency':
            return {...state, sourceCurrency: action.currency};
        case 'addTargetCurrency':
            return {...state, targetCurrency: action.currency};
        case 'addAmount':
            return {...state, amount: action.amount};
        case 'addHistory': {
            const lengthLimit = 5;
            if(state.history.length >= lengthLimit) {
                const [_, ...history] = state.history;
                return {...state, history: [...history, action.historyEntrance]}
            }
            return {...state, history: [...state.history, action.historyEntrance]}
        }
        default:
            return state;
    }
}

const initialState: ExchangeState = {
    sourceCurrency: 'USD',
    targetCurrency: 'PLN',
    amount: 1,
    history: []
}

export function useExchangeState(): [ExchangeState, (action: Action) => void] {
    const [state, dispatch] = useReducer(reducer, initialState);

    return [state, dispatch];
}