import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import ReviewsSection from "../components/ReviewsSection";
import {useDispatch, useSelector} from "react-redux";
import {selectReviews, selectUserAvatar, selectUserId} from "../redux/selectors";
import {createBeerReviewRequest, deleteReviewRequest, getReviewsByBeerIdRequest} from "../redux/actions/actions";

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
    const [isDialogOpened, setIsDialogOpened] = useState(false);
    const [reviewToDeleteId, setReviewToDeleteId] = useState('');

    useEffect(() => {
        dispatch(getReviewsByBeerIdRequest({
            beerId: beerId
        }));
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

    const handleDeletingReview = useCallback(() => {
        dispatch(deleteReviewRequest({
            id: reviewToDeleteId
        }));
        setIsDialogOpened(prev => !prev);
    }, [dispatch, reviewToDeleteId]);

    const handleDialogOpening = useCallback((id) => {
        setReviewToDeleteId(id);
        setIsDialogOpened(prev => !prev);
    }, [])

    const handleDialogClosing = useCallback(() => {
        setReviewToDeleteId('');
        setIsDialogOpened(prev => !prev);
    }, []);

    return (
        <ReviewsSection
            avatarUrl={avatarUrl}
            reviews={reviews}
            review={review}
            setReview={setReview}
            handleReviewCreation={handleReviewCreation}
            handleDeletingReview={handleDeletingReview}
            handleDialogOpening={handleDialogOpening}
            handleDialogClosing={handleDialogClosing}
            isDialogOpened={isDialogOpened}
        />
    );
};

ReviewsSectionContainer.propTypes = {

};

export default ReviewsSectionContainer;