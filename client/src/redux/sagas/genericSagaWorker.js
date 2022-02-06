import {put} from "redux-saga/effects";
import actionToCamelCase from "../../helpers/actionToCamelCase";
import * as callMethods from "./callMethods"

export function* genericSagaWorker (action) {
    const {payload, type} = action;
    const methodName = actionToCamelCase(type);

    try {
        const response = yield callMethods[methodName](payload);
        const successType = type.replace("REQUEST", "SUCCESS");
        yield put({type: successType, payload: {...payload, response}});
    } catch (e) {
        const failedType = type.replace("REQUEST", "FAILED");
        yield put({type: failedType, payload: {...payload, e}});
    }
}