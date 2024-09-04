import { debounce } from 'lodash'
import {addAmountAction} from "../hooks/useExchangeState";
export const debouncedAddAmountAction = debounce(addAmountAction, 300) as typeof addAmountAction;
