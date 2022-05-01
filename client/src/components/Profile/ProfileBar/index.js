import React from 'react';
import PropTypes from 'prop-types';
import {Button, Toolbar} from "@mui/material";
import {barItems} from "./barItems";
import {styled} from "@mui/styles";
import {FormattedMessage} from "react-intl";

const CustomButton = styled(Button)({
    '&:hover': {
        backgroundColor: 'rgb(173,216,230)',
        boxShadow: 'none',
    },
});

const ProfileBar = ({handleBarItemChange}) => {
    return (
        <Toolbar
            disableGutters={true}
            sx={{
                height: "40px !important",
                minHeight: "40px !important"
            }}
        >
            {barItems.map(item => (
                <CustomButton
                    key={item.localeId}
                    onClick={() => {
                        handleBarItemChange(item.localeId)
                    }}
                >
                    <FormattedMessage
                        description="profile bar item"
                        defaultMessage="profile bar item"
                        id={item.localeId}
                    />
                </CustomButton>
            ))}
        </Toolbar>
    );
};

ProfileBar.propTypes = {};

export default ProfileBar;