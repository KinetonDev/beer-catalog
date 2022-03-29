import React, {useCallback, useEffect, useRef} from 'react';
import {useDispatch} from "react-redux";
import BeerGrid from "../components/BeerGrid";
import {
    addFavoriteBeerRequest,
    removeFavoriteBeerRequest, resetBeers,
} from "../redux/actions/actions";
import useObserver from "../hooks/useObserver";
import {useNavigate} from "react-router-dom";

const BeerGridContainer = ({page, setPage, beers, totalPages}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const observerCallback = useCallback((entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        setPage(page => page + 1);
    }, [setPage]);
    const observableElement = useObserver(useRef(null), observerCallback);

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

    useEffect(() => {
        return () => {
            dispatch(resetBeers());
        }
    }, []);
    
    return (
        <BeerGrid
            beers={beers}
            endNotReached={page <= totalPages}
            observableElement={observableElement}
            handleNavigation={handleNavigation}
            handleAddingFavorite={handleAddingFavorite}
            handleRemovingFavorite={handleRemovingFavorite}
        />
    );
};

export default BeerGridContainer;