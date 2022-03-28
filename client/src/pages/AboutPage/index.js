import React from 'react';
import PropTypes from 'prop-types';
import useStyle from './styles'
import {Typography} from "@mui/material";

const AboutPage = () => {
    const classes = useStyle();

    return (
        <div className={classes.aboutPage}>
            <Typography
                variant={"h5"}
            >
                Simple application for real fans of craft beer.
            </Typography>
        </div>
    );
};

AboutPage.propTypes = {};

export default AboutPage;