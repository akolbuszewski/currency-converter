export function parseNumericInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const value = e.target.value;
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
        return 0;
    }
    return parsedValue;
}