import React, {useState} from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import useStyles from "./styles";
import {styled} from "@mui/styles";

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
                    <WhiteTextButton variant="text" onClick={onNavigate}>OPEN</WhiteTextButton>
                    {isFavorite ?
                        <WhiteTextButton variant="text" onClick={onFavoriteRemove}>REMOVE FAVORITE</WhiteTextButton> :
                        <WhiteTextButton variant="text" onClick={onFavoriteAdd}>FAVORITE</WhiteTextButton>
                    }
                </CardActions>
            </div>
        </Card>
    );
};

export default BeerCard;