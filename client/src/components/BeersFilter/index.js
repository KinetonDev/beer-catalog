import React, {useCallback, useState} from 'react';
import { Stack } from "@mui/material";
import AdvancedFilter from "./AdvancedFilter";
import SearchField from "./SearchField";
import {useDispatch} from "react-redux";
import {searchBeersRequest} from "../../redux/actions/actions";

const BeersFilter = () => {
    const [filter, setFilter] = useState({
        abv: 2,
        ibu: 0,
        ebc: 4,
        searchQuery: ''
    });
    const [wasSearchPerformed, setWasSearchPerformed] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        if(!wasSearchPerformed) {
            setWasSearchPerformed(true);
        }

        dispatch(searchBeersRequest({
            filter,
            wasSearchPerformed
        }))
    }, [wasSearchPerformed, setWasSearchPerformed, dispatch, filter]);

    const handleFilterChange = useCallback((newFilter) => {
        setFilter(newFilter)
    }, [setFilter]);


    return (
        <form onSubmit={handleSubmit}>
            <Stack
                alignItems="center"
            >
                <SearchField
                    filter={filter}
                    onChangeFilter={handleFilterChange}
                    onSubmit={handleSubmit}
                />
                {wasSearchPerformed && <AdvancedFilter
                    filter={filter}
                    changeFilter={handleFilterChange}
                />}
            </Stack>
        </form>
    );
};

export default BeersFilter;