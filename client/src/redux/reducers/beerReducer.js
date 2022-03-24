import {
    CHANGE_FILTER,
    GET_BEER_BY_ID_REQUEST,
    GET_BEER_BY_ID_SUCCESS,
    GET_BEERS_SUCCESS,
    INCREMENT_PAGE,
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
    beers: [],
    currentBeer: {
        value: { },
        isLoading: true
    }
}

export const beerReducer = (state = initialState, action) => {
    console.log(action.type);
    console.log(action.payload);

    switch (action.type) {
        case GET_BEERS_SUCCESS:
            return {...state, beers: [...state.beers, ...action.payload.response]};
        case GET_BEER_BY_ID_REQUEST:
            return {...state, currentBeer: {...state.currentBeer, isLoading: true} }
        case GET_BEER_BY_ID_SUCCESS:
            return {...state, currentBeer: {...state.currentBeer, value: action.payload.response, isLoading: false}};
        case SET_WAS_SEARCH_PERFORMED:
            return {...state, wasSearchPerformed: action.payload};
        case CHANGE_FILTER:
            return {...state, filter: action.payload.filter, page: 1, beers: []};
        case INCREMENT_PAGE:
            return {...state, page: state.page + 1};
        default:
            return state;
    }
}