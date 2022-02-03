import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectBeers, selectSearchedBeers} from "../../redux/selectors";
import BeersFilter from "../../components/BeersFilter";
import BeersList from "../../components/BeersList"
import {Typography} from "@mui/material";
import {getBeersRequest} from "../../redux/actions/actions";

const LandingPage = () => {
    const beers = useSelector(state => selectBeers(state));
    const searchedBeers = useSelector(state => selectSearchedBeers(state));
    const [filteredBeers, setFilteredBeers] = useState([...searchedBeers]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBeersRequest({
            page: 1,
            perPage: 80
        }))
    }, []);

    return (
        <div>
            <BeersFilter/>
            <BeersList
                beers={!filteredBeers.length ? beers : filteredBeers}
            />
        </div>
    );
};

export default LandingPage;