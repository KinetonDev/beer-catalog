import {
    CHANGE_FILTER,
    GET_BEERS_REQUEST,
    INCREMENT_PAGE,
    SET_WAS_SEARCH_PERFORMED
} from "../types/types";

export function getBeersRequest(payload) {
    return {
        type: GET_BEERS_REQUEST,
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