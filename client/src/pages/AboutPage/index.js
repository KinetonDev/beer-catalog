import React from 'react';
import PropTypes from 'prop-types';
import useStyle from './styles'
import {Typography} from "@mui/material";
import {FormattedMessage} from "react-intl";

const AboutPage = () => {
    const classes = useStyle();

    return (
        <div className={classes.aboutPage}>
            <Typography
                variant={"h5"}
            >
                <FormattedMessage
                    description="Application description"
                    defaultMessage="Simple application for real fans of craft beer."
                    id="about.body"
                />
            </Typography>
        </div>
    );
};

AboutPage.propTypes = {};

export default AboutPage;