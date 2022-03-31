import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectWasSearchPerformed} from "../redux/selectors";
import {setWasSearchPerformed} from "../redux/actions/actions";
import BeersFilter from "../components/BeersFilter";

const BeersFilterContainer = (
    {
        setPage,
        visualFilter,
        setVisualFilter,
        setFilter,
        page
    }) => {
    const wasSearchPerformed = useSelector(state => selectWasSearchPerformed(state));
    const dispatch = useDispatch();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if(!wasSearchPerformed) {
            dispatch(setWasSearchPerformed(true));
        }

        setFilter({
            ...visualFilter
        })
        setPage(1)
    }, [wasSearchPerformed, dispatch, setFilter, visualFilter, setPage]);

    return (
        <BeersFilter
            visualFilter={visualFilter}
            handleSubmit={handleSubmit}
            handleFilterChange={setVisualFilter}
            handleFilterChangeCommitted={setVisualFilter}
            wasSearchPerformed={wasSearchPerformed}
        />
    );
};

export default BeersFilterContainer;