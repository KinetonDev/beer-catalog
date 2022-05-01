import React, {useCallback} from 'react';
import {List, ListItem, Typography} from "@mui/material";
import useStyle from "./styles";
import IngredientsList from "./Ingredients";
import MethodList from "./Method";
import {FormattedMessage} from "react-intl";

const BeerBrewing = (props) => {
    const classes = useStyle();

    return (
        <div className={classes.beerBrewing}>
            <Typography
                variant="h5"
            >
                <FormattedMessage
                    description="Brewing header"
                    defaultMessage="Brewing"
                    id="beerDetails.brewing.header"
                />
            </Typography>
            <Typography
                variant="body1"
                className={classes.tips}
            >
                {props.currentBeer.brewers_tips}
            </Typography>
            <div className={classes.beerBrewingInstruction}>
                <div className={classes.beerBrewingIngredients}>
                    <Typography
                        variant="h5"
                        className={classes.title}
                    >
                        <FormattedMessage
                            description="Ingredients header"
                            defaultMessage="Ingredients"
                            id="beerDetails.ingredients.header"
                        />
                    </Typography>
                    <IngredientsList
                        ingredients={props.currentBeer.ingredients}
                    />
                </div>
                <div className={classes.beerBrewingMethod}>
                    <Typography
                        variant="h5"
                        className={classes.title}
                    >
                        <FormattedMessage
                            description="Method header"
                            defaultMessage="Method"
                            id="beerDetails.method.header"
                        />
                    </Typography>
                    <MethodList
                        method={props.currentBeer.method}
                    />
                </div>
            </div>
        </div>
    );
};

export default BeerBrewing;