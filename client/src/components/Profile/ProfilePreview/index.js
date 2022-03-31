import React from 'react';
import PropTypes from 'prop-types';
import useStyle from './styles'
import {Avatar, Button, Typography} from "@mui/material";
import {styled} from "@mui/styles";
import {countriesList} from "../../Common/countries";

const CustomButton = styled(Button)({
    '&:hover': {
        backgroundColor: 'rgb(173,216,230)',
        boxShadow: 'none',
    },
});

const ProfilePreview = (
    {
        user,
        handleEdit,
        handleDialogOpening
    }) => {
    const classes = useStyle();

    return (
        <div className={classes.profilePreview}>
            <div className={classes.profilePreviewContent}>
                <Avatar
                    alt={user.username}
                    src={user.avatarUrl ? user.avatarUrl : "https://www.seekpng.com/png/detail/73-730482_existing-user-default-avatar.png"}
                    sx={{ width: 100, height: 100, marginBottom: "15px" }}
                />
                <div>
                    {!!user.firstName &&
                        <Typography
                            display={'inline-block'}
                            gutterBottom={true}
                            variant={"h5"}
                        >
                            {user.firstName}&nbsp;
                        </Typography>
                    }
                    {!!user.lastName &&
                        <Typography
                            display={'inline-block'}
                            gutterBottom={true}
                            variant={"h5"}
                        >
                            {user.lastName}
                        </Typography>
                    }
                </div>
                <Typography
                    gutterBottom={true}
                    variant={"h5"}
                >
                    {user.username}
                </Typography>
                <Typography
                    color={"gray"}
                >
                    {user.email}
                </Typography>
                <Typography
                    color={"gray"}
                >
                    {!!countriesList.find(c => c.value === user.country) ? countriesList.find(c => c.value === user.country).label : "Country"}
                </Typography>
            </div>
            <div className={classes.profilePreviewActions}>
                <CustomButton onClick={handleEdit}>Edit</CustomButton>
                <CustomButton onClick={handleDialogOpening}>Change avatar</CustomButton>
            </div>
        </div>
    );
};

ProfilePreview.propTypes = {};

export default ProfilePreview;