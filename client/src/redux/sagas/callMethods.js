import {call} from "redux-saga/effects";
import {request, requestWithXHR} from "./request";
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