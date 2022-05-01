import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import useStyles from "./styles";
import {styled} from "@mui/styles";
import {FormattedMessage} from "react-intl";

const WhiteTextButton = styled(Button)({
    color: "white",
    '&:hover': {
        backgroundColor: 'rgb(147,147,147)',
        boxShadow: 'none',
    },
});

const BeerCard = ({
      alt,
      name,
      image,
      tagline,
      onNavigate,
      onFavoriteAdd,
      onFavoriteRemove,
      isFavorite
}) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                component="img"
                alt={alt}
                height="140"
                image={image}
            />
            <div className={classes.cardContent}>
                <CardContent>
                    <Typography
                        variant="h6"
                    >
                        {name}
                    </Typography>
                    <Typography
                        variant="body2"
                    >
                        {tagline}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <WhiteTextButton variant="text" onClick={onNavigate}>
                        <FormattedMessage
                            description="Open button"
                            defaultMessage="Open"
                            id="landing.beer.openButton"
                        />
                    </WhiteTextButton>
                    {isFavorite ?
                        <WhiteTextButton variant="text" onClick={onFavoriteRemove}>
                            <FormattedMessage
                                description="remove favorite button"
                                defaultMessage="Remove favorite"
                                id="landing.beer.removeFavoriteButton"
                            />
                        </WhiteTextButton> :
                        <WhiteTextButton variant="text" onClick={onFavoriteAdd}>
                            <FormattedMessage
                                description="add favorite button"
                                defaultMessage="Favorite"
                                id="landing.beer.favoriteButton"
                            />
                        </WhiteTextButton>
                    }
                </CardActions>
            </div>
        </Card>
    );
};

export default BeerCard;