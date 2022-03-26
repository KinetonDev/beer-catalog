import {
    ADD_FAVORITE_FAILED,
    ADD_FAVORITE_REQUEST, ADD_FAVORITE_SUCCESS,
    GET_FAVORITES_FAILED,
    GET_FAVORITES_REQUEST,
    GET_FAVORITES_SUCCESS, REMOVE_FAVORITE_FAILED, REMOVE_FAVORITE_REQUEST, REMOVE_FAVORITE_SUCCESS
} from "../types/types";
import {favoritesPaginationPageSize} from "../../constants";

const defaultFlagsValues = {
    flags: {

    },
    loadingFlags: {
        isFavoritesLoading: true
    }
}

const initialState = {
    favorites: [],
    totalPages: 2,
    totalCount: 20,
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
            return {...state, favorites: action.payload.response,
                loadingFlags: {...state.loadingFlags, isFavoritesLoading: false},
                totalPages: Math.ceil(action.payload.totalCount / favoritesPaginationPageSize),
                totalCount: action.payload.totalCount};
        case GET_FAVORITES_FAILED:
            return {...state, loadingFlags: {...state.loadingFlags, isFavoritesLoading: false}};
        case ADD_FAVORITE_SUCCESS:
        case ADD_FAVORITE_REQUEST:
        case ADD_FAVORITE_FAILED:
            return state;
        case REMOVE_FAVORITE_SUCCESS:
            return {...state, favorites: deleteFromFavoritesById(state.favorites, action.payload.beerId)};
        case REMOVE_FAVORITE_REQUEST:
        case REMOVE_FAVORITE_FAILED:
        default:
            return state;
    }
};

const deleteFromFavoritesById = (favorites, id) => {
    if (!favorites.length || !favorites.some(f => f.id === id))
        return favorites;

    const newFavorites = [...favorites];

    const favorite = newFavorites.find(f => f.id === id);

    const index = newFavorites.indexOf(favorite);

    newFavorites.splice(index, 1);

    return newFavorites;
}