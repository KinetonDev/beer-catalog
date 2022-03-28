import React from 'react';
import PropTypes from 'prop-types';
import {Button, Toolbar} from "@mui/material";
import {barItems} from "./barItems";
import {styled} from "@mui/styles";

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
                    key={item.title}
                    onClick={() => {
                        handleBarItemChange(item.title)
                    }}
                >
                    {item.title}
                </CustomButton>
            ))}
        </Toolbar>
    );
};

ProfileBar.propTypes = {};

export default ProfileBar;