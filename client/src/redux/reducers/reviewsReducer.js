import {
    CREATE_REVIEW,
    CREATE_REVIEW_REQUEST,
    CREATE_REVIEW_SUCCESS,
    GET_REVIEWS_BY_BEER_ID_REQUEST,
    GET_REVIEWS_BY_BEER_ID_SUCCESS
} from "../types/types";

const initialState = {
    currentBeerReviews: [
        {
            username: "Lox",
            avatarUrl: "https://u.kanobu.ru/editor/images/48/a2bc4eea-3344-45d1-bf53-4e6d4629576b.webp",
            rating: 2,
            description: "piece of crap",
            postedOn: "05/05/2022"
        },
        {
            username: "Genius",
            avatarUrl: "https://klike.net/uploads/posts/2021-12/1638345229_2.jpg",
            rating: 10,
            description: "masterpiece",
            postedOn: "05/05/2022"
        }
    ]
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
        default:
            return state;
    }
};