import {put} from "redux-saga/effects";
import actionToCamelCase from "../../helpers/actionToCamelCase";
import * as callMethods from "./callMethods"

export function* genericSagaWorker (action) {
    const {payload, type} = action;
    const methodName = actionToCamelCase(type);

    try {
        const response = yield callMethods[methodName](payload);
        console.log(response);
        const successType = type.replace("REQUEST", "SUCCESS");
        console.log(successType);
        yield put({type: successType, payload: {
                beers: response
            }});
    } catch (e) {
        const failedType = type.replace("REQUEST", "FAILED");
        yield put({type: failedType, payload: {
                error: e.response
            }});
    }
}