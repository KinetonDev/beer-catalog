import React from 'react';
import {Button, Typography} from "@mui/material";
import useStyle from "./styles";
import {FormattedMessage} from "react-intl";

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
                        <FormattedMessage
                            description="Remove from favorites button"
                            defaultMessage="REMOVE FROM FAVORITES"
                            id="beerDetails.removeFavoriteButton"
                        />
                    </Button> :
                    <Button
                        variant="contained"
                        className={classes.beerFavoritesButton}
                        onClick={handleAddingFavorite}
                    >
                        <FormattedMessage
                            description="Add to favorites button"
                            defaultMessage="ADD TO FAVORITES"
                            id="beerDetails.addFavoriteButton"
                        />
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