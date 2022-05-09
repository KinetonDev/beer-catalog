import React from 'react';
import PropTypes from 'prop-types';
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";
import useStyle from './styles'

const ReviewsSection = (
    {
        avatarUrl,
        reviews,
        review,
        setReview,
        handleReviewCreation
    }
) => {
    const classes = useStyle();

    return (
        <div className={classes.reviewsSection}>
            <ReviewForm
                avatarUrl={avatarUrl}
                review={review}
                setReview={setReview}
                onReviewCreation={handleReviewCreation}
            />
            <ReviewsList
                reviews={reviews}
            />
        </div>
    );
};

ReviewsSection.propTypes = {

};

export default ReviewsSection;