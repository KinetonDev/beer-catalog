import React from 'react';
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import useStyles from "./styles";
import {styled} from "@mui/styles";

const BlackTextButton = styled(Button)({
    color: "black",
    '&:hover': {
        backgroundColor: 'rgb(200,200,200)',
        boxShadow: 'none',
    },
});

const BeerRecord = (
    {
        name,
        alt,
        description,
        image,
        onNavigate,
        tagline,
        onFavoriteRemove
    }) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <div className={classes.cardContent}>
                <CardContent>
                    <Typography
                        variant="h6"
                    >
                        {name}
                    </Typography>
                    <Typography
                        className={classes.cardTagline}
                        variant="body1"
                    >
                        {tagline}
                    </Typography>
                    <Typography
                        variant="body2"
                    >
                        {description}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <BlackTextButton variant="text" onClick={onNavigate}>OPEN</BlackTextButton>
                    <BlackTextButton variant="text" onClick={onFavoriteRemove}>REMOVE FAVORITE</BlackTextButton>
                </CardActions>
            </div>
            <CardMedia
                className={classes.cardMedia}
                component="img"
                alt={alt}
                height="140"
                image={image}
            />
        </Card>
    );
};

export default BeerRecord;