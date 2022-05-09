import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, Typography} from "@mui/material";
import {Rating} from "@mui/lab";
import useStyle from './styles'

const Review = (
    {
        description,
        rating,
        avatarUrl,
        postedOn,
        username
    }
) => {
    const classes = useStyle();

    return (
        <div className={classes.review}>
            <Avatar
                sx={{ width: 50, height: 50, marginRight: "10px"}}
                src={avatarUrl}
            />
            <div className={classes.content}>
                <div className={classes.headerAuthor}>
                    <Typography variant={"body1"}>{username}</Typography>
                    &nbsp;
                    <Typography variant={"body2"}>{new Date(postedOn).toLocaleString()}</Typography>
                </div>
                <Typography>{description}</Typography>
                <Rating value={rating} readOnly max={10}/>
            </div>
        </div>
    );
};

Review.propTypes = {};

export default Review;