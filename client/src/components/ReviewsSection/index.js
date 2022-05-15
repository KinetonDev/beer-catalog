import React from 'react';
import PropTypes from 'prop-types';
import ReviewForm from "./ReviewForm";
import ReviewsList from "./ReviewsList";
import useStyle from './styles'
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const ReviewsSection = (
    {
        avatarUrl,
        reviews,
        review,
        setReview,
        handleReviewCreation,
        handleDeletingReview,
        handleDialogOpening,
        handleDialogClosing,
        isDialogOpened
    }
) => {
    const classes = useStyle();

    return (
        <div className={classes.reviewsSection}>
            <Dialog
                open={isDialogOpened}
                onClose={handleDialogClosing}
            >
                <DialogTitle>
                    Do you really want to delete this review?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDialogClosing}>Back</Button>
                    <Button
                        onClick={handleDeletingReview}
                        autoFocus
                        variant={"contained"}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
            <ReviewForm
                avatarUrl={avatarUrl}
                review={review}
                setReview={setReview}
                onReviewCreation={handleReviewCreation}
            />
            <ReviewsList
                reviews={reviews}
                handleDialogOpening={handleDialogOpening}
            />
        </div>
    );
};

ReviewsSection.propTypes = {

};

export default ReviewsSection;