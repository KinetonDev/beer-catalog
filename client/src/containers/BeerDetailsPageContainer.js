import React, {useCallback, useEffect} from 'react';
import BeerDetailsPage from "../pages/BeerDetailsPage";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentBeer} from "../redux/selectors";
import {
    addFavoriteBeerRequest,
    getBeerByIdRequest,
    removeFavoriteBeerRequest
} from "../redux/actions/actions";
import Loader from "../components/PageLoader";

const BeerDetailsPageContainer = () => {
    const { beerId } = useParams();
    const { value: beer, isLoading } = useSelector(state => selectCurrentBeer(state));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBeerByIdRequest({
            id: beerId
        }))
    }, []);
    
    const handleAddingFavorite = useCallback(() => {
        dispatch(addFavoriteBeerRequest({
            beer_id: beerId
        }));
    }, [beerId, dispatch]);
    
    const handleRemovingFavorite = useCallback(() => {
        dispatch(removeFavoriteBeerRequest({
            beerId
        }))
    }, [beerId, dispatch]);

    return (
        (isLoading ?
            <Loader/> :
            <BeerDetailsPage
                currentBeer={beer}
                handleAddingFavorite={handleAddingFavorite}
                handleRemovingFavorite={handleRemovingFavorite}
            />
        )
    );
};

export default BeerDetailsPageContainer;