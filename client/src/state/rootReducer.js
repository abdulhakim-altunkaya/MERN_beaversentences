import { combineReducers } from '@reduxjs/toolkit';
import colorReducer from "./colorSlice";
import numberReducer from "./numberSlice";

const rootReducer = combineReducers({
    color: colorReducer,
    number: numberReducer,
})
export default rootReducer;