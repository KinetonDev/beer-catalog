import {
    CREATE_REVIEW,
    CREATE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    GET_REVIEWS_BY_BEER_ID_REQUEST,
    GET_REVIEWS_BY_BEER_ID_SUCCESS
} from "../types/types";

const initialState = {
    currentBeerReviews: [ ],
}

export const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_REVIEWS_BY_BEER_ID_REQUEST:
            return state;
        case GET_REVIEWS_BY_BEER_ID_SUCCESS:
            return {...state, currentBeerReviews: action.payload.response};
        case CREATE_REVIEW_REQUEST:
            return state;
        case CREATE_REVIEW:
            return {...state, currentBeerReviews: [action.payload, ...state.currentBeerReviews]}
        case DELETE_REVIEW_SUCCESS:
            return {...state, currentBeerReviews: getArrayWithoutDeletedReview(state.currentBeerReviews, action.payload.id)}
        default:
            return state;
    }
};

function getArrayWithoutDeletedReview(reviews, idToDelete) {
    return reviews.filter(r => r.id !== idToDelete);
}