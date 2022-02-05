import React from 'react';
import { Stack } from "@mui/material";
import AdvancedFilter from "./AdvancedFilter";
import SearchField from "./SearchField";
import useStyle from "./style";

const BeersFilter = (props) => {
    const classes = useStyle();

    return (
        <form onSubmit={props.handleSubmit} className={classes.beerFilter}>
            <Stack
                alignItems="center"
            >
                <SearchField
                    filter={props.filter}
                    onChangeFilter={props.handleFilterChange}
                    onSubmit={props.handleSubmit}
                />
                {props.wasSearchPerformed && <AdvancedFilter
                    filter={props.filter}
                    changeFilter={props.handleFilterChange}
                    changeFilterCommitted={props.handleFilterChangeCommitted}
                />}
            </Stack>
        </form>
    );
};

export default BeersFilter;