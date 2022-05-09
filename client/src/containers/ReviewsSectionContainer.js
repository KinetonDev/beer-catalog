import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ReviewsSection from "../components/ReviewsSection";
import {useDispatch, useSelector} from "react-redux";
import {selectReviews, selectUserAvatar, selectUserId} from "../redux/selectors";
import {createBeerReviewRequest, getReviewsByBeerIdRequest} from "../redux/actions/actions";

const ReviewsSectionContainer = (
    {
        beerId
    }) => {
    const avatarUrl = useSelector(state => selectUserAvatar(state));
    const reviews = useSelector(state => selectReviews(state));
    const dispatch = useDispatch();
    const userId = useSelector(state => selectUserId(state))
    const [review, setReview] = useState({
        rating: 0,
        description: ""
    });

    useEffect(() => {
        dispatch(getReviewsByBeerIdRequest({
            beerId: beerId
        }))
    }, [beerId, dispatch]);
    
    const handleReviewCreation = useCallback(() => {
        dispatch(createBeerReviewRequest({
            beer_id: beerId,
            user_id: userId,
            description: review.description,
            rating: review.rating,
            posted_on: new Date()
        }));

        setReview({
            rating: 0,
            description: ""
        });
    }, [beerId, dispatch, review.description, review.rating, userId]);

    return (
        <ReviewsSection
            avatarUrl={avatarUrl}
            reviews={reviews}
            review={review}
            setReview={setReview}
            handleReviewCreation={handleReviewCreation}
        />
    );
};

ReviewsSectionContainer.propTypes = {

};

export default ReviewsSectionContainer;