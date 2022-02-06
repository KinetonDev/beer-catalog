import {
    CHANGE_FILTER,
    GET_BEERS_SUCCESS, INCREMENT_PAGE,
    SET_WAS_SEARCH_PERFORMED
} from "../types/types";

const initialState = {
    filter: {
        abv: [2,14],
        ibu: [0,120],
        ebc: [4,80],
        searchQuery: ''
    },
    page: 1,
    perPage: 9,
    wasSearchPerformed: false,
    beers: []
}

export const beerReducer = (state = initialState, action) => {
    console.log(action.type);

    switch (action.type) {
        case GET_BEERS_SUCCESS:
            return {...state, beers: [...state.beers, ...action.payload.response]};
        case SET_WAS_SEARCH_PERFORMED:
            return {... state, wasSearchPerformed: action.payload};
        case CHANGE_FILTER:
            return {...state, filter: action.payload.filter, page: 1, beers: []};
        case INCREMENT_PAGE:
            return {...state, page: state.page + 1};
        default:
            return state;
    }
}