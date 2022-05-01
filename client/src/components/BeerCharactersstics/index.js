import React from 'react';
import {List, ListItem, Tooltip, Typography} from "@mui/material";
import useStyle from './styles';
import BeerProperties from "./BeerProperties";
import BeerFoodPairingList from "./BeerFoodPairingList";
import {FormattedMessage} from "react-intl";

const BeerCharacteristics = (props) => {
    const classes = useStyle();

    return (
        <div className={classes.beerCharacteristics}>
            <div className={classes.beerProperties}>
                <Typography
                    variant="h5"
                    className={classes.title}
                >
                    <FormattedMessage
                        description="Properties header"
                        defaultMessage="Properties"
                        id="beerDetails.properties.header"
                    />
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
                    <FormattedMessage
                        description="Food pairing header"
                        defaultMessage="Food pairing"
                        id="beerDetails.foodPairing.header"
                    />
                </Typography>
                <BeerFoodPairingList
                    currentBeer={props.currentBeer}
                />
            </div>
        </div>
    );
};

export default BeerCharacteristics;