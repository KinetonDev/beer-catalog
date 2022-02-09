import React from 'react';
import useStyle from './styles';
import BeerHeader from "../../components/BeerHeader";
import BeerCharacteristics from "../../components/BeerCharactersstics";
import BeerBrewing from "../../components/BeerBrewing";

const BeerDetailsPage = (props) => {
    const classes = useStyle();

    return (
        <div className={classes.beerDetailsPage}>
            <BeerHeader
                currentBeer={props.currentBeer}
            />
            <BeerCharacteristics
                currentBeer={props.currentBeer}
            />
            <BeerBrewing
                currentBeer={props.currentBeer}
            />
        </div>
    );
};

export default BeerDetailsPage;