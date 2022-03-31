import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import BeerGrid from "../components/BeerGrid";
import {
    addFavoriteBeerRequest,
    removeFavoriteBeerRequest, resetBeers,
} from "../redux/actions/actions";
import useObserver from "../hooks/useObserver";
import {useNavigate} from "react-router-dom";

const BeerGridContainer = (
    {
        page,
        setPage,
        beers,
        totalPages,
        firstBeersLoading
    }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const observerCallback = useCallback((entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        if (page <= totalPages) {
            setPage(page => page + 1);
        }
    }, [page, setPage, totalPages]);
    const observableElement = useRef(null);
    useObserver(observableElement, observerCallback);

    const handleNavigation = useCallback((beerId) => {
        navigate(`/${beerId}`);
    }, [navigate]);

    const handleAddingFavorite = useCallback((beerId) => {
        dispatch(addFavoriteBeerRequest({
            beer_id: beerId
        }))
    }, [dispatch]);

    const handleRemovingFavorite = useCallback((beerId) => {
        dispatch(removeFavoriteBeerRequest({
            beerId: beerId
        }));
    }, [dispatch]);
    
    return (
        <BeerGrid
            beers={beers}
            firstBeersLoading={firstBeersLoading}
            endNotReached={page < totalPages}
            observableElement={observableElement}
            handleNavigation={handleNavigation}
            handleAddingFavorite={handleAddingFavorite}
            handleRemovingFavorite={handleRemovingFavorite}
        />
    );
};

export default BeerGridContainer;