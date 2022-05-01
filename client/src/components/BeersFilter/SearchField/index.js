import React from 'react';
import {Box, IconButton, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {injectIntl} from "react-intl";

const SearchField = (
    {
        intl,
        filter,
        onChangeFilter
    }) => {
    const inputPlaceholder = intl.formatMessage({
       id: "landing.filter.searchBeerInput.placeholder",
       description: "Search beers text input",
       defaultMessage: "Search beers..."
    });

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField
                id="standard-basic"
                placeholder={inputPlaceholder}
                variant="standard"
                value={filter.searchQuery}
                onChange={(e) => onChangeFilter({...filter, searchQuery: e.target.value})}
            />
            <IconButton
                type="submit"
            >
                <SearchIcon/>
            </IconButton>
        </Box>
    );
};

export default injectIntl(SearchField);