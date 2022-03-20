import {call} from "redux-saga/effects";
import {authorizedRequest, request, requestWithFetch, requestWithXHR} from "./request";
import {GET, POST} from "../../helpers/HTTPMethods";
import createUrlFromFilter from "../../helpers/createUrlFromFilter";

export function getBeers(payload, accessToken) {
    return call(
        authorizedRequest,
        {
            url: createUrlFromFilter("beers", payload.filter, payload.page, payload.perPage),
            method: GET,
        },
        requestWithFetch,
        accessToken
    )
};

export function getBeerById(payload, accessToken) {
    return call(
        authorizedRequest,
        {
            url: createUrlFromFilter(`beers/${payload.id}`),
            method: GET,
        },
        requestWithFetch,
        accessToken
    )
}

export function register(payload) {
    return call(
        request,
        {
            url: createUrlFromFilter("auth/register"),
            method: POST,
            body: payload,
        },
        requestWithFetch
    );
}

export function confirmEmail(payload) {
    return call(
        request,
        {
            url: createUrlFromFilter("auth/confirm-email"),
            method: POST,
            body: payload
        },
        requestWithFetch
    );
}

export function login(payload) {
    return call(
        request,
        {
            url: createUrlFromFilter("auth/login"),
            method: POST,
            body: payload
        },
        requestWithFetch
    );
}

export function checkEmail(payload) {
    return call(
        request,
        {
            url: createUrlFromFilter(`users/check-email/${payload.email}`),
            method: GET
        },
        requestWithFetch
    );
}

export function checkUsername(payload) {
    return call(
        request,
        {
            url: createUrlFromFilter(`users/check-username/${payload.username}`),
            method: GET
        },
        requestWithFetch
    );
}