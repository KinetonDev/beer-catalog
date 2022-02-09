import React from 'react';
import {List, ListItem, Tooltip, Typography} from "@mui/material";
import useStyle from './styles';
import BeerProperties from "./BeerProperties";
import BeerFoodPairingList from "./BeerFoodPairingList";

const BeerCharacteristics = (props) => {
    const classes = useStyle();

    return (
        <div className={classes.beerCharacteristics}>
            <div className={classes.beerProperties}>
                <Typography
                    variant="h5"
                    className={classes.title}
                >
                    Properties
                </Typography>
                <BeerProperties
                    currentBeer={props.currentBeer}
                />
            </div>
            <div className={classes.beerFoodPairing}>
                <Typography
                    variant="h5"
                    className={classes.title}
                >
                    Food pairing
                </Typography>
                <BeerFoodPairingList
                    currentBeer={props.currentBeer}
                />
            </div>
        </div>
    );
};

export default BeerCharacteristics;