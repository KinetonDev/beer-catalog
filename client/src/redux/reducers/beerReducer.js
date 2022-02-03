import {GET_BEERS_FAILED, GET_BEERS_REQUEST, GET_BEERS_SUCCESS} from "../types/types";

const initialState = {
    beers: []
}

export const beerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BEERS_REQUEST:
            return state;
        case GET_BEERS_SUCCESS:
            return {...state, beers: action.payload.beers};
        case GET_BEERS_FAILED:
            return state;
        default:
            return state;
    }
}