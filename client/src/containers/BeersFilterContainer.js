import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectFilter, selectWasSearchPerformed} from "../redux/selectors";
import {changeFilter, setWasSearchPerformed} from "../redux/actions/actions";
import BeersFilter from "../components/BeersFilter";

const BeersFilterContainer = () => {
    const savedFilter = useSelector(state => selectFilter(state));
    const [filter, setFilter] = useState({...savedFilter});

    const wasSearchPerformed = useSelector(state => selectWasSearchPerformed(state));
    const dispatch = useDispatch();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if(!wasSearchPerformed) {
            dispatch(setWasSearchPerformed(true));
        }

        dispatch(changeFilter({
            filter
        }));

    }, [wasSearchPerformed, dispatch, filter]);

    const handleFilterChange = useCallback((newFilter) => {
        setFilter(newFilter);
    }, []);

    const handleFilterChangeCommitted = useCallback((newFilter) => {
        setFilter(newFilter);
    }, []);

    useEffect(() => {
        return () => {
            dispatch(changeFilter({
                filter: filter
            }));
        };
    }, []);

    return (
        <BeersFilter
            filter={filter}
            handleSubmit={handleSubmit}
            handleFilterChange={handleFilterChange}
            handleFilterChangeCommitted={handleFilterChangeCommitted}
            wasSearchPerformed={wasSearchPerformed}
        />
    );
};

export default BeersFilterContainer;