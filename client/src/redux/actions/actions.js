import {
    ADD_FAVORITE_REQUEST,
    CHANGE_FILTER,
    CHECK_EMAIL_REQUEST,
    CHECK_USERNAME_REQUEST,
    CLEAR_FLAGS,
    CONFIRM_EMAIL_REQUEST,
    GET_BEER_BY_ID_REQUEST,
    GET_BEERS_REQUEST, GET_FAVORITES_REQUEST, GET_ME_REQUEST,
    INCREMENT_PAGE,
    LOGIN_REQUEST, REFRESH_TOKEN_REQUEST,
    REGISTER_REQUEST,
    SET_WAS_SEARCH_PERFORMED, START_VALIDATING
} from "../types/types";

export function getBeersRequest(payload) {
    return {
        type: GET_BEERS_REQUEST,
        payload
    }
}

export function getBeerByIdRequest(payload) {
    return {
        type: GET_BEER_BY_ID_REQUEST,
        payload
    }
}

export function changeFilter(payload) {
    return {
        type: CHANGE_FILTER,
        payload
    }
}

export function setWasSearchPerformed(payload) {
    return {
        type: SET_WAS_SEARCH_PERFORMED,
        payload
    }
}

export function incrementPage() {
    return {
        type: INCREMENT_PAGE
    }
}

export function registerRequest(payload) {
    return {
        type: REGISTER_REQUEST,
        payload
    }
}

export function loginRequest(payload) {
    return {
        type: LOGIN_REQUEST,
        payload
    }
}

export function confirmEmailRequest(payload) {
    return {
        type: CONFIRM_EMAIL_REQUEST,
        payload
    }
}

export function clearFlags() {
    return {
        type: CLEAR_FLAGS
    }
}

export function checkEmailRequest(payload) {
    return {
        type: CHECK_EMAIL_REQUEST,
        payload
    }
}

export function checkUsernameRequest(payload) {
    return {
        type: CHECK_USERNAME_REQUEST,
        payload
    }
}

export function startValidating() {
    return {
        type: START_VALIDATING
    }
}

export function refreshTokenRequest() {
    return {
        type: REFRESH_TOKEN_REQUEST
    }
}

export function getFavoriteBeersRequest(payload) {
    return {
        type: GET_FAVORITES_REQUEST,
        payload
    }
}

export function addFavoriteBeerRequest(payload) {
    return {
        type: ADD_FAVORITE_REQUEST,
        payload
    }
}

export function getMeRequest() {
    return {
        type: GET_ME_REQUEST
    }
}