import {
    CHANGE_FILTER,
    CHECK_EMAIL_REQUEST,
    CHECK_USERNAME_REQUEST,
    CLEAR_FLAGS,
    CONFIRM_EMAIL_REQUEST,
    GET_BEER_BY_ID_REQUEST,
    GET_BEERS_REQUEST,
    INCREMENT_PAGE,
    LOGIN_REQUEST, REFRESH_TOKEN_REQUEST,
    REGISTER_REQUEST,
    SET_WAS_SEARCH_PERFORMED, START_VALIDATING
} from "../types/types";

export function getBeersRequest(payload) {
    return {
        type: GET_BEERS_REQUEST,
        payload: payload
    }
}

export function getBeerByIdRequest(payload) {
    return {
        type: GET_BEER_BY_ID_REQUEST,
        payload: payload
    }
}

export function changeFilter(payload) {
    return {
        type: CHANGE_FILTER,
        payload: payload
    }
}

export function setWasSearchPerformed(payload) {
    return {
        type: SET_WAS_SEARCH_PERFORMED,
        payload: payload
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
        payload: payload
    }
}

export function loginRequest(payload) {
    return {
        type: LOGIN_REQUEST,
        payload: payload
    }
}

export function confirmEmailRequest(payload) {
    return {
        type: CONFIRM_EMAIL_REQUEST,
        payload: payload
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
        payload: payload
    }
}

export function checkUsernameRequest(payload) {
    return {
        type: CHECK_USERNAME_REQUEST,
        payload: payload
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