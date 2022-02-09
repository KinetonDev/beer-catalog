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

const BeerCard = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardMedia
                className={classes.cardMedia}
                component="img"
                alt={props.alt}
                height="140"
                image={props.image}
            />
            <div className={classes.cardContent}>
                <CardContent>
                    <Typography
                        variant="h6"
                    >
                        {props.name}
                    </Typography>
                    <Typography
                        variant="body2"
                    >
                        {props.tagline}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <WhiteTextButton variant="text" onClick={props.onNavigate}>OPEN</WhiteTextButton>
                    <WhiteTextButton variant="text">FAVORITE</WhiteTextButton>
                </CardActions>
            </div>
        </Card>
    );
};

export default BeerCard;