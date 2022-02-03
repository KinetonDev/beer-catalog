import {call} from "redux-saga/effects";
import {apiUrl} from "../api_url";
import {request, requestWithXHR} from "./request";

export function getBeers(payload) {
    return call(
        request,
        `${apiUrl}/beers/?page=${payload.page}&per_page=${payload.perPage}`,
        "GET",
        requestWithXHR
    )
};