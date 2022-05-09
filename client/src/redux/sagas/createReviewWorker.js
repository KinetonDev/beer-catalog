import {put, select} from "redux-saga/effects"
import {selectUserInfo} from "../selectors";
import {CREATE_REVIEW} from "../types/types";

export function* createReviewWorker(action) {
    const {username, avatarUrl} = yield select(selectUserInfo);
    yield put({
        type: CREATE_REVIEW,
        payload: {
            ...action.payload,
            username,
            avatar_url: avatarUrl
        }
    })
}