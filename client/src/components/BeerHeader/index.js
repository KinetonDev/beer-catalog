import React from 'react';
import {Button, Typography} from "@mui/material";
import useStyle from "./styles";

const BeerHeader = ({currentBeer, handleAddingFavorite, handleRemovingFavorite}) => {
    const classes = useStyle();

    return (
        <div className={classes.beerHeader}>
            <div className={classes.beerMainDescription}>
                <Typography
                    variant="h4"
                >
                    {currentBeer.name}
                </Typography>
                <Typography
                    variant="body1"
                    className={classes.beerTagline}
                >
                    {currentBeer.tagline}
                </Typography>
                {currentBeer.is_favorite ?
                    <Button
                        variant="contained"
                        className={classes.beerFavoritesButton}
                        onClick={handleRemovingFavorite}
                    >
                        REMOVE FROM FAVORITES
                    </Button> :
                    <Button
                        variant="contained"
                        className={classes.beerFavoritesButton}
                        onClick={handleAddingFavorite}
                    >
                        ADD TO FAVORITES
                    </Button>}
                <Typography
                    variant="body1"
                >
                    {currentBeer.description}
                </Typography>
            </div>
            <div className={classes.beerImageWrapper}>
                <img src={currentBeer.image_url} className={classes.beerImage}/>
            </div>
        </div>
    );
};

export default BeerHeader;