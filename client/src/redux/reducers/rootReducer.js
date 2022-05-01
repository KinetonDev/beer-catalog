import {combineReducers} from "redux";
import {beerReducer} from "./beerReducer";
import {userReducer} from "./userReducer";
import {favoritesReducer} from "./favoritesReducer";
import {appReducer} from "./appReducer";

export const rootReducer = combineReducers({
    beer: beerReducer,
    user: userReducer,
    favorites: favoritesReducer,
    app: appReducer
});