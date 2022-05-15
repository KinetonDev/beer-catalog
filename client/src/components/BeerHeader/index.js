import React from 'react';
import {Button, Typography} from "@mui/material";
import useStyle from "./styles";
import {FormattedMessage} from "react-intl";
import {appRoles} from "../../constants";

const BeerHeader = (
    {
        currentBeer,
        handleAddingFavorite,
        handleRemovingFavorite,
        role,
        handleExportReviewsAsPdf
    }) => {
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
                <div>
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
                    {
                        role.toLowerCase() === appRoles.admin && <Button
                            variant={"contained"}
                            style={{
                                marginLeft: "20px"
                            }}
                            onClick={handleExportReviewsAsPdf}
                        >
                            <FormattedMessage
                                description="Export reviews as pdf"
                                defaultMessage="Export reviews as pdf"
                                id="beerDetails.export_pdf"
                            />
                        </Button>
                    }
                </div>
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