import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectWasSearchPerformed} from "../redux/selectors";
import {resetBeers, setWasSearchPerformed} from "../redux/actions/actions";
import BeersFilter from "../components/BeersFilter";

const BeersFilterContainer = ({setPage, filter, setFilter, page}) => {
    const wasSearchPerformed = useSelector(state => selectWasSearchPerformed(state));
    const dispatch = useDispatch();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if (page !== 1) {
            if(!wasSearchPerformed) {
                dispatch(setWasSearchPerformed(true));
            }

            dispatch(resetBeers());
            setPage(1);
        }

    }, [page, wasSearchPerformed, dispatch, setPage]);

    return (
        <BeersFilter
            filter={filter}
            handleSubmit={handleSubmit}
            handleFilterChange={setFilter}
            handleFilterChangeCommitted={setFilter}
            wasSearchPerformed={wasSearchPerformed}
        />
    );
};

export default BeersFilterContainer;