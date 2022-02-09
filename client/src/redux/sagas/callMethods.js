import {call} from "redux-saga/effects";
import {request, requestWithFetch, requestWithXHR} from "./request";
import {GET} from "../../helpers/HTTPMethods";
import createUrlFromFilter from "../../helpers/createUrlFromFilter";

export function getBeers(payload) {
    return call(
        request,
        createUrlFromFilter("beers", payload.filter, payload.page, payload.perPage),
        GET,
        requestWithXHR
    )
};

export function getBeerById(payload) {
    return call(
        request,
        createUrlFromFilter(`beers/${payload.id}`),
        GET,
        requestWithFetch
    )
}