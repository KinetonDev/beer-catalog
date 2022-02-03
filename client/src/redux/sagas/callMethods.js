import {call} from "redux-saga/effects";
import {apiUrl} from "../api_url";
import {request, requestWithXHR} from "./request";
import {GET} from "../../helpers/HTTPMethods";

export function getBeers(payload) {
    return call(
        request,
        `${apiUrl}/beers/?page=${payload.page}&per_page=${payload.perPage}`,
        GET,
        requestWithXHR
    )
};

export function searchBeers(payload) {
    return call(
        request,
        `${apiUrl}/beers/?beer_name=${payload.filter.searchQuery}`,
        GET,
        requestWithXHR
    )
}