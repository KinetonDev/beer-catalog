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

const BeerRecord = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <div className={classes.cardContent}>
                <CardContent>
                    <Typography
                        variant="h6"
                    >
                        {props.name}
                    </Typography>
                    <Typography
                        className={classes.cardTagline}
                        variant="body1"
                    >
                        {props.tagline}
                    </Typography>
                    <Typography
                        variant="body2"
                    >
                        {props.description}
                    </Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <BlackTextButton variant="text">OPEN</BlackTextButton>
                    <BlackTextButton variant="text">REMOVE FAVORITE</BlackTextButton>
                </CardActions>
            </div>
            <CardMedia
                className={classes.cardMedia}
                component="img"
                alt={props.alt}
                height="140"
                image={props.image}
            />
        </Card>
    );
};

export default BeerRecord;