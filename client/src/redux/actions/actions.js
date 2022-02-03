import {GET_BEERS_REQUEST} from "../types/types";

export function getBeersRequest(payload) {
    return {
        type: GET_BEERS_REQUEST,
        payload: payload
    }
}