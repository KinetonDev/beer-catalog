import {GET_BEERS_REQUEST, SEARCH_BEERS_REQUEST} from "../types/types";

export function getBeersRequest(payload) {
    return {
        type: GET_BEERS_REQUEST,
        payload: payload
    }
}

export function searchBeersRequest(payload) {
    return {
        type: SEARCH_BEERS_REQUEST,
        payload: payload
    }
}