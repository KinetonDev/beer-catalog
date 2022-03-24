import {
    ADD_FAVORITE_FAILED,
    ADD_FAVORITE_REQUEST, ADD_FAVORITE_SUCCESS,
    GET_FAVORITES_FAILED,
    GET_FAVORITES_REQUEST,
    GET_FAVORITES_SUCCESS
} from "../types/types";

const defaultFlagsValues = {
    flags: {

    },
    loadingFlags: {
        isFavoritesLoading: true
    }
}

const initialState = {
    favorites: [],
    flags: {
        ...defaultFlagsValues.flags
    },
    loadingFlags: {
        ...defaultFlagsValues.loadingFlags
    }
}

export const favoritesReducer = (state = initialState, action) => {
    console.log(action.type);
    console.log(action.payload);

    switch (action.type) {
        case GET_FAVORITES_REQUEST:
            return {...state, loadingFlags: {...state.loadingFlags, isFavoritesLoading: true}};
        case GET_FAVORITES_SUCCESS:
            return {...state, favorites: action.payload.response, loadingFlags: {...state.loadingFlags, isFavoritesLoading: false}}
        case GET_FAVORITES_FAILED:
            return {...state, loadingFlags: {...state.loadingFlags, isFavoritesLoading: false}};
        case ADD_FAVORITE_SUCCESS:
        case ADD_FAVORITE_REQUEST:
        case ADD_FAVORITE_FAILED:
        default:
            return state;
    }
};