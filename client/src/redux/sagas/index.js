import {all, takeEvery} from "redux-saga/effects"
import {genericSagaWorker} from "./genericSagaWorker";
import {CREATE_REVIEW_SUCCESS} from "../types/types";
import {createReviewWorker} from "./createReviewWorker";

export function* rootSaga() {
    yield all([
        takeEvery(({type}) => /_REQUEST/g.test(type), genericSagaWorker),
        takeEvery(CREATE_REVIEW_SUCCESS, createReviewWorker)
    ]);
};