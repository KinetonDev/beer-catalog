import React from 'react';
import PropTypes from 'prop-types';
import useStyle from './styles'

const UserProfilePage = (props) => {
    const classes = useStyle();

    return (
        <div className={classes.profilePage}>

        </div>
    );
};

UserProfilePage.propTypes = {};

export default UserProfilePage;