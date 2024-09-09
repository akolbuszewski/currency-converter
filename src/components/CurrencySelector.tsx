import {CurrencyData} from "../models/CurrencyData";
import {Autocomplete, TextField, Box} from "@mui/material";
import { useState} from "react";

export interface CurrencySelectorProps {
    currencies: Array<CurrencyData>;
    onCurrencyChange: (currency: CurrencyData | null) => void;
    label: string;
    defaultValueShortCode: string;
}

export function CurrencySelector({currencies, onCurrencyChange, label, defaultValueShortCode}: CurrencySelectorProps) {
    const [defaultCurrency] = useState<CurrencyData | null>(currencies.find(c => c.short_code === defaultValueShortCode) || null);


    return (
        <Autocomplete
            defaultValue={defaultCurrency}
            onChange={(_, currency) => onCurrencyChange(currency)}
            options={currencies}
            sx={{width: 300}}
            getOptionLabel={option => `${option.short_code} ${option.name}`}
            renderInput={(params) => <TextField {...params} label={label}/>}
            renderOption={(props, option) => {
                const {key, ...optionProps} = props;
                return (
                    <Box
                        key={key}
                        component="li"
                        {...optionProps}
                    >
                        {option.short_code} {option.name}
                    </Box>);
            }}
        />);
}