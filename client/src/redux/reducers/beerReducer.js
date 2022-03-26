import {
    ADD_FAVORITE_SUCCESS,
    GET_BEER_BY_ID_REQUEST,
    GET_BEER_BY_ID_SUCCESS,
    GET_BEERS_SUCCESS,
    REMOVE_FAVORITE_SUCCESS, RESET_BEERS,
    SET_WAS_SEARCH_PERFORMED
} from "../types/types";
import {landingPaginationPageSize} from "../../constants";

const initialState = {
    totalPages: 2,
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
            return {...state, beers: [...state.beers, ...action.payload.response], totalPages: Math.ceil(action.payload.totalCount / landingPaginationPageSize)};
        case GET_BEER_BY_ID_REQUEST:
            return {...state, currentBeer: {...state.currentBeer, isLoading: true} }
        case GET_BEER_BY_ID_SUCCESS:
            return {...state, currentBeer: {...state.currentBeer, value: action.payload.response, isLoading: false}};
        case SET_WAS_SEARCH_PERFORMED:
            return {...state, wasSearchPerformed: action.payload};
        case RESET_BEERS:
            return {...state, beers: []};
        case ADD_FAVORITE_SUCCESS:
            return {...state,
                beers: toggleFavoriteOnEvery(state.beers, action.payload.beer_id),
                currentBeer: toggleFavoriteOnCurrent(state.currentBeer, action.payload.beer_id)}
        case REMOVE_FAVORITE_SUCCESS:
            return {...state,
                beers: toggleFavoriteOnEvery(state.beers, action.payload.beerId),
                currentBeer: toggleFavoriteOnCurrent(state.currentBeer, action.payload.beerId)}
        default:
            return state;
    }
}

const toggleFavoriteOnEvery = (beers, id) => {
    if (!beers.length) {
        return beers;
    }

    const newBeers = [...beers];
    const beer = newBeers.find(b => b.id === id);

    beer.is_favorite = !beer.is_favorite;

    return newBeers;
}

const toggleFavoriteOnCurrent = (currentBeer, id) => {
    if (!currentBeer.value.id || currentBeer.value.id !== id)
        return currentBeer;

    const newBeer = {
        ...currentBeer,
        value: {
            ...currentBeer.value
        }
    };

    newBeer.value.is_favorite = !newBeer.value.is_favorite;

    return newBeer;
}