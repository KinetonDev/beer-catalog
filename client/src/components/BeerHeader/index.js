import React from 'react';
import {Button, Typography} from "@mui/material";
import useStyle from "./styles";

const BeerHeader = (props) => {
    const classes = useStyle();

    return (
        <div className={classes.beerHeader}>
            <div className={classes.beerMainDescription}>
                <Typography
                    variant="h4"
                >
                    {props.currentBeer.name}
                </Typography>
                <Typography
                    variant="body1"
                    className={classes.beerTagline}
                >
                    {props.currentBeer.tagline}
                </Typography>
                <Button
                    variant="contained"
                    className={classes.beerFavoritesButton}
                >
                    ADD TO FAVORITES
                </Button>
                <Typography
                    variant="body1"
                >
                    {props.currentBeer.description}
                </Typography>
            </div>
            <div className={classes.beerImageWrapper}>
                <img src={props.currentBeer.image_url} className={classes.beerImage}/>
            </div>
        </div>
    );
};

export default BeerHeader;