import { combineReducers } from '@reduxjs/toolkit';
import colorReducer from "./colorSlice";
import numberReducer from "./numberSlice";
import pairReducer from "./slicePair";

const rootReducer = combineReducers({
    color: colorReducer,
    number: numberReducer,
    pair: pairReducer,
})
export default rootReducer;