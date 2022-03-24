import React from 'react';
import useStyle from './styles'
import {CircularProgress} from "@mui/material";

const Loader = () => {
    const classes = useStyle();

    return (
        <div className={classes.loader}>
            <CircularProgress/>
        </div>
    );
};

export default Loader;