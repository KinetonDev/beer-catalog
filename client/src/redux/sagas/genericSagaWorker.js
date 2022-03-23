import {put, select} from "redux-saga/effects";
import actionToCamelCase from "../../helpers/actionToCamelCase";
import * as callMethods from "./callMethods"
import {selectAccessToken} from "../selectors";
import {REFRESH_TOKEN_FAILED, REFRESH_TOKEN_SUCCESS} from "../types/types";

export function* genericSagaWorker (action) {
    const {payload, type} = action;
    const methodName = actionToCamelCase(type);

    try {
        const accessToken = yield select(selectAccessToken);
        const response = yield callMethods[methodName](payload, accessToken);
        const successType = type.replace("REQUEST", "SUCCESS");
        yield put({type: successType, payload: {...payload, response: response.body}});
    } catch (e) {
        if (e.status === 401) {
            try {
                const refreshResponse = yield callMethods["refreshToken"]();
                yield put({type: REFRESH_TOKEN_SUCCESS, payload: {...payload, response: refreshResponse.body}});
                try {
                    const response = yield callMethods[methodName](payload, refreshResponse.body.access_token);
                    const successType = type.replace("REQUEST", "SUCCESS");
                    yield put({type: successType, payload: {...payload, response: response.body}});
                } catch (e) {
                    const failedType = type.replace("REQUEST", "FAILED");
                    yield put({type: failedType, payload: {...payload, error: e}});
                }
            } catch(e) {
                yield put({type: REFRESH_TOKEN_FAILED});
            }
        }

        const failedType = type.replace("REQUEST", "FAILED");
        yield put({type: failedType, payload: {...payload, error: e}});
    }
}