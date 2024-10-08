import './App.css'
import {CurrencySelector} from "./components/CurrencySelector";
import {Box, TextField} from "@mui/material";
import {useCurrenciesData} from "./hooks/useCurrenciesData";
import {
    addAmountAction,
    addHistoryAction,
    addSourceAction,
    addTargetAction,
    useExchangeState
} from "./hooks/useExchangeState";
import {useConvertData} from "./hooks/useConvertData";
import {parseNumericInput} from "./utils/parseNumericInput";
import {floor} from "lodash";
import {useEffect} from "react";

function App() {
    const [currencies, loading, error] = useCurrenciesData();
    const [exchangeState, dispatch] = useExchangeState();
    const [conversion, loadingConversion, conversionErrors] = useConvertData(exchangeState.sourceCurrency, exchangeState.targetCurrency, exchangeState.amount);

    useEffect(() => {
        if(conversion) {
            dispatch(addHistoryAction({
                sourceCurrency: conversion.from,
                targetCurrency: conversion.to,
                amount: conversion.amount,
                convertedAmount: conversion.value,
                timestamp: Date.now(),
            }))
        }
    }, [conversion])
    if (error || conversionErrors) return <div>Error: {error || conversionErrors}</div>;

    if (loading) return <div>Loading...</div>;

    return (
        <div className="App">
            <header className="App-header">
                <h1>Currency Converter</h1>
            </header>
            <Box sx={{display: 'flex'}}>
                <TextField value={exchangeState.amount} inputProps={{type: 'number'}}
                           onChange={(e) => dispatch(addAmountAction(parseNumericInput(e)))}/>
                <CurrencySelector currencies={currencies!}
                                  onCurrencyChange={(c) => c && dispatch(addSourceAction(c.short_code))} label={'From'}
                                  defaultValueShortCode={"USD"}/>
                <CurrencySelector currencies={currencies!}
                                  onCurrencyChange={(c) => c && dispatch(addTargetAction(c.short_code))} label={'To'}
                                  defaultValueShortCode={"PLN"}/>
            </Box>

            <Box>
                {loadingConversion ? 'Loading...' : conversion ? `${conversion.amount} ${conversion.from} = ${floor(conversion.value, 2)} ${conversion.to}` : 'No conversion yet'}
            </Box>
            divider
            {[...exchangeState.history].reverse().map((h) =>(
            <Box key={h.timestamp}>
                {`${h.amount} ${h.sourceCurrency} = ${h.convertedAmount} ${h.targetCurrency}`}
            </Box>))
            }
        </div>
    )
}

export default App
