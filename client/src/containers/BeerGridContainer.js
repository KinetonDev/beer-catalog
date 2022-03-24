import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectBeers, selectFilter, selectPage, selectPerPage} from "../redux/selectors";
import BeerGrid from "../components/BeerGrid";
import {
    addFavoriteBeerRequest,
    getBeersRequest,
    incrementPage,
    removeFavoriteBeerRequest,
} from "../redux/actions/actions";
import useObserver from "../hooks/useObserver";
import createUrlFromFilter from "../helpers/createUrlFromFilter";
import {useNavigate} from "react-router-dom";

const BeerGridContainer = () => {
    const beers = useSelector(state => selectBeers(state));
    const filter = useSelector(state => selectFilter(state));
    const page = useSelector(state => selectPage(state));
    const perPage = useSelector(state => selectPerPage(state));
    const [totalPages, setTotalPages] = useState(25);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        console.log(createUrlFromFilter("beers", filter, page, perPage))

        dispatch(getBeersRequest({
            page,
            perPage,
            filter
        }));
    }, [page, perPage, filter]);

    const observableElement = useRef(null);
    useObserver(observableElement, (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        dispatch(incrementPage());
    });

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
            endNotReached={page < totalPages}
            observableElement={observableElement}
            handleNavigation={handleNavigation}
            handleAddingFavorite={handleAddingFavorite}
            handleRemovingFavorite={handleRemovingFavorite}
        />
    );
};

export default BeerGridContainer;