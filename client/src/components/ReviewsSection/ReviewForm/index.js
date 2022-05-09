import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Avatar, Button, TextField} from "@mui/material";
import useStyle from './styles'
import {Rating} from "@mui/lab";

const ReviewForm = (
    {
        avatarUrl,
        review,
        setReview,
        onReviewCreation
    }
) => {
    const [areButtonsShown, setAreButtonsShown] = useState(false);
    const classes = useStyle();

    return (
        <div>
            <div>
                <div className={classes.textFieldSection}>
                    <Avatar
                        sx={{ width: 50, height: 50, marginRight: "10px"}}
                        src={avatarUrl}
                    />
                    <TextField
                        className={classes.textField}
                        placeholder={"Add review..."}
                        value={review.description}
                        onChange={(e) => setReview({
                            ...review,
                            description: e.target.value
                        })}
                        onFocus={() => setAreButtonsShown(true)}
                    />
                </div>
                {areButtonsShown &&
                    <div className={classes.buttons}>
                        <Rating
                            className={classes.rating}
                            max={10}
                            value={review.rating}
                            onChange={(e) => setReview({
                                ...review,
                                rating: Number.parseInt(e.target.value)
                            })}
                        />
                        <Button onClick={() => {
                            setAreButtonsShown(false);
                            setReview({
                                rating: 0,
                                description: ""
                            })
                        }}>
                            Cancel
                        </Button>
                        <Button
                            variant={"contained"}
                            onClick={onReviewCreation}
                        >
                            Create
                        </Button>
                    </div>
                }
            </div>
        </div>
    );
};

ReviewForm.propTypes = {};

export default ReviewForm;