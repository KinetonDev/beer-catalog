import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectBeers, selectFilter, selectPage, selectPerPage} from "../redux/selectors";
import BeersList from "../components/BeersList";
import {getBeersRequest, incrementPage} from "../redux/actions/actions";
import useObserver from "../hooks/useObserver";
import createUrlFromFilter from "../helpers/createUrlFromFilter";

const BeerListContainer = () => {
    const beers = useSelector(state => selectBeers(state));
    const filter = useSelector(state => selectFilter(state));
    const page = useSelector(state => selectPage(state));
    const perPage = useSelector(state => selectPerPage(state));
    const [totalPages, setTotalPages] = useState(25);
    const dispatch = useDispatch();

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


    return (
        <BeersList
            beers={beers}
            endNotReached={page < totalPages}
            observableElement={observableElement}
        />
    );
};

export default BeerListContainer;