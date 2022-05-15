import React from 'react';
import useStyle from './styles';
import BeerHeader from "../../components/BeerHeader";
import BeerCharacteristics from "../../components/BeerCharactersstics";
import BeerBrewing from "../../components/BeerBrewing";
import ReviewsSectionContainer from "../../containers/ReviewsSectionContainer";

const BeerDetailsPage = (
    {
        currentBeer,
        handleAddingFavorite,
        handleRemovingFavorite,
        beerId,
        role,
        handleExportReviewsAsPdf
    }) => {
    const classes = useStyle();

    return (
        <div className={classes.beerDetailsPage}>
            <BeerHeader
                currentBeer={currentBeer}
                handleAddingFavorite={handleAddingFavorite}
                handleRemovingFavorite={handleRemovingFavorite}
                handleExportReviewsAsPdf={handleExportReviewsAsPdf}
                role={role}
            />
            <BeerCharacteristics
                currentBeer={currentBeer}
            />
            <BeerBrewing
                currentBeer={currentBeer}
            />
            <ReviewsSectionContainer
                beerId={beerId}
            />
        </div>
    );
};

export default BeerDetailsPage;