import React, {useEffect, useState} from 'react';
import LandingPage from "../pages/LandingPage";
import {getBeersRequest, resetBeers} from "../redux/actions/actions";
import {useDispatch, useSelector} from "react-redux";
import {selectBeers, selectFirstBeersLoading, selectTotalBeerPages} from "../redux/selectors";
import {landingPaginationPageSize} from "../constants";

const LandingPageContainer = () => {
    const beers = useSelector(state => selectBeers(state));
    const firstBeersLoading = useSelector(state => selectFirstBeersLoading(state));
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({
        abv: [0,41],
        ibu: [8,1157],
        ebc: [2,500],
        searchQuery: ''
    });
    const [visualFilter, setVisualFilter] = useState({
        ...filter
    });
    const dispatch = useDispatch();

    const totalPages = useSelector(state => selectTotalBeerPages(state));
    console.log(`total pages + ${totalPages}`)

    useEffect(() => {
        dispatch(getBeersRequest({
            page,
            perPage: landingPaginationPageSize,
            filter
        }));
    }, [page, filter, dispatch]);

    return (
        <LandingPage
            firstBeersLoading={firstBeersLoading}
            beers={beers}
            page={page}
            setPage={setPage}
            setFilter={setFilter}
            visualFilter={visualFilter}
            setVisualFilter={setVisualFilter}
            totalPages={totalPages}
        />
    );
};

export default LandingPageContainer;