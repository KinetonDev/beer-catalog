import {combineReducers} from "redux";
import {beerReducer} from "./beerReducer";
import {userReducer} from "./userReducer";

export const rootReducer = combineReducers({
    beer: beerReducer,
    user: userReducer
});