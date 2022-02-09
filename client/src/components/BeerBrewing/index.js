import React, {useCallback} from 'react';
import {List, ListItem, Typography} from "@mui/material";
import useStyle from "./styles";
import IngredientsList from "./Ingredients";
import MethodList from "./Method";

const BeerBrewing = (props) => {
    const classes = useStyle();

    return (
        <div className={classes.beerBrewing}>
            <Typography
                variant="h5"
            >
                Brewing
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
                        Ingredients
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
                        Method
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