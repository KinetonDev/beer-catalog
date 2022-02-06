import React from 'react';
import {Typography} from "@mui/material";
import BeerListContainer from "../../containers/BeerListContainer";
import useStyle from "./styles";

const FavoritesPage = () => {
    const classes = useStyle();

    return (
        <div className={classes.favoritesPage}>
            <Typography
                align="center"
                variant="h4"
            >
                Your favorite beers
            </Typography>
            <BeerListContainer/>
        </div>
    );
};

export default FavoritesPage;