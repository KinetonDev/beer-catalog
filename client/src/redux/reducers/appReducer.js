import {CHANGE_LANGUAGE} from "../types/types";
import {LOCALES} from "../../lang/locales";

const initialState = {
    lang: navigator.language
};

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            return {...state, lang: state.lang === LOCALES.RUSSIAN ? LOCALES.ENGLISH : LOCALES.RUSSIAN};
        default: return state;
    }
};