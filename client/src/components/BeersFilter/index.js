import React from 'react';
import { Stack } from "@mui/material";
import AdvancedFilter from "./AdvancedFilter";
import SearchField from "./SearchField";
import useStyle from "./style";

const BeersFilter = (
    {
        handleSubmit,
        handleFilterChange,
        handleFilterChangeCommitted,
        visualFilter,
        wasSearchPerformed
    }) => {
    const classes = useStyle();

    return (
        <form onSubmit={handleSubmit} className={classes.beerFilter}>
            <Stack
                alignItems="center"
            >
                <SearchField
                    filter={visualFilter}
                    onChangeFilter={handleFilterChange}
                />
                {wasSearchPerformed && <AdvancedFilter
                    filter={visualFilter}
                    changeFilter={handleFilterChange}
                    changeFilterCommitted={handleFilterChangeCommitted}
                />}
            </Stack>
        </form>
    );
};

export default BeersFilter;