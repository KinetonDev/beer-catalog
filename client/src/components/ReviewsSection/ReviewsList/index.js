import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from "@mui/material";
import useStyle from './styles'
import Review from "../Review";

const ReviewsList = (
    {
        reviews
    }
) => {
    const classes = useStyle();

    return (
        <div className={classes.reviewsList}>
            {reviews.length ?
                reviews.map((review, index) => {
                    return <Review
                        username={review.username}
                        avatarUrl={review.avatar_url}
                        rating={review.rating}
                        description={review.description}
                        postedOn={review.posted_on}
                        key={index}
                    />;
                }) :
                <Typography
                    variant={"h5"}
                >
                    There are no reviews yet!
                </Typography>
            }
        </div>
    );
};

ReviewsList.propTypes = {};

export default ReviewsList;