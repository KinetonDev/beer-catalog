import React from 'react';
import useStyle from './styles';
import BeerHeader from "../../components/BeerHeader";
import BeerCharacteristics from "../../components/BeerCharactersstics";
import BeerBrewing from "../../components/BeerBrewing";

const BeerDetailsPage = ({currentBeer, handleAddingFavorite, handleRemovingFavorite}) => {
    const classes = useStyle();

    return (
        <div className={classes.beerDetailsPage}>
            <BeerHeader
                currentBeer={currentBeer}
                handleAddingFavorite={handleAddingFavorite}
                handleRemovingFavorite={handleRemovingFavorite}
            />
            <BeerCharacteristics
                currentBeer={currentBeer}
            />
            <BeerBrewing
                currentBeer={currentBeer}
            />
        </div>
    );
};

export default BeerDetailsPage;