import {
    GET_BEERS_FAILED,
    GET_BEERS_REQUEST,
    GET_BEERS_SUCCESS,
    SEARCH_BEERS_FAILED,
    SEARCH_BEERS_REQUEST,
    SEARCH_BEERS_SUCCESS
} from "../types/types";

const initialState = {
    beers: [],
    searchedBeers: [],
    filteredBeers: []
}

export const beerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_BEERS_REQUEST:
            return state;
        case GET_BEERS_SUCCESS:
            return {...state, beers: action.payload};
        case GET_BEERS_FAILED:
            return state;
        case SEARCH_BEERS_REQUEST:
            return state;
        case SEARCH_BEERS_SUCCESS:
            return {...state, searchedBeers: action.payload};
        case SEARCH_BEERS_FAILED:
            return state;
        default:
            return state;
    }
}