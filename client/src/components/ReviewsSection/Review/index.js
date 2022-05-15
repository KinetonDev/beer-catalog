import React from 'react';
import PropTypes from 'prop-types';
import {Avatar, IconButton, Typography} from "@mui/material";
import {Rating} from "@mui/lab";
import useStyle from './styles'
import {useSelector} from "react-redux";
import {selectUserId, selectUserRole} from "../../../redux/selectors";
import ClearIcon from '@mui/icons-material/Clear';
import {appRoles} from "../../../constants";

const Review = (
    {
        description,
        rating,
        avatarUrl,
        postedOn,
        username,
        userId,
        handleDialogOpening,
        id
    }
) => {
    const currentUserId = useSelector(selectUserId);
    const currentUserRole = useSelector(selectUserRole);
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
                <div className={classes.main}>
                    <Typography>{description}</Typography>
                    {(currentUserRole.toLowerCase() === appRoles.admin || currentUserId === userId) && <IconButton
                        className={classes.deleteIcon}
                        onClick={() => handleDialogOpening(id)}
                    >
                        <ClearIcon/>
                    </IconButton>}
                </div>
                <Rating value={rating} readOnly max={10}/>
            </div>
        </div>
    );
};

Review.propTypes = {};

export default Review;