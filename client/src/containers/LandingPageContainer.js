import React, {useEffect, useState} from 'react';
import LandingPage from "../pages/LandingPage";
import {getBeersRequest} from "../redux/actions/actions";
import {useDispatch, useSelector} from "react-redux";
import {selectBeers, selectTotalBeerPages} from "../redux/selectors";
import {landingPaginationPageSize} from "../constants";

const LandingPageContainer = () => {
    const beers = useSelector(state => selectBeers(state));
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState({
        abv: [0,41],
        ibu: [8,1157],
        ebc: [2,500],
        searchQuery: ''
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
    }, [page, dispatch]);

    return (
        <LandingPage
            beers={beers}
            page={page}
            setPage={setPage}
            setFilter={setFilter}
            filter={filter}
            totalPages={totalPages}
        />
    );
};

export default LandingPageContainer;