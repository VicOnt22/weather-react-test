import {combineReducers} from "redux";
import {cityReducer} from "./city/cityReducer";

export const rootReducer = combineReducers({
    city: cityReducer
})