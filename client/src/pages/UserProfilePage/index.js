import React, {useState} from 'react';
import PropTypes from 'prop-types';
import useStyle from './styles'
import ProfileBar from "../../components/Profile/ProfileBar";
import ProfilePreview from "../../components/Profile/ProfilePreview";
import {barItems} from "../../components/Profile/ProfileBar/barItems";
import ProfileInfo from "../../components/Profile/ProfileInfo";
import ProfileBeerReviews from "../../components/Profile/ProfileBeerReviews";
import Divider from '@mui/material/Divider';
import AvatarDialog from "../../components/Profile/ProfilePreview/AvatarDialog";

const UserProfilePage = (
    {
        currentBarItem,
        handleBarItemChange,
        user,
        isEditing,
        handleEdit,
        handleSave,
        initialFormState,
        handleAvatarChanging,
        handleCancel,
        handleDialogClosing,
        handleDialogOpening,
        isDialogOpened,
        avatarBase64,
        handleAvatarSaving
    }) => {
    const classes = useStyle();

    return (
        <div className={classes.profilePage}>
            <AvatarDialog
                avatarBase64={avatarBase64}
                handleAvatarChanging={handleAvatarChanging}
                handleClose={handleDialogClosing}
                isOpened={isDialogOpened}
                handleAvatarSaving={handleAvatarSaving}
            />
            <div className={classes.content}>
                <ProfileBar
                    handleBarItemChange={handleBarItemChange}
                />
                <Divider style={{marginBottom: "10px"}}/>
                {selectBarItem(currentBarItem, {user, isEditing, handleSave, initialFormState, handleCancel})}
            </div>
            <ProfilePreview
                user={user}
                handleEdit={handleEdit}
                handleDialogOpening={handleDialogOpening}
            />
        </div>
    );
};

function selectBarItem(barTitle, {user, isEditing, handleSave, initialFormState, handleCancel}) {
    switch (barTitle) {
        case barItems[0].localeId:
            return <ProfileInfo
                user={user}
                isEditing={isEditing}
                handleSave={handleSave}
                initialFormState={initialFormState}
                handleCancel={handleCancel}
            />
        case barItems[1].localeId:
            return <ProfileBeerReviews
                user={user}
            />
        default:
            return <div>Unknown item</div>
    }
}

UserProfilePage.propTypes = {};

export default UserProfilePage;