import {all, takeEvery} from "redux-saga/effects"
import {genericSagaWorker} from "./genericSagaWorker";

export function* rootSaga() {
    yield all([
        takeEvery(({type}) => /_REQUEST/g.test(type), genericSagaWorker)
    ]);
};