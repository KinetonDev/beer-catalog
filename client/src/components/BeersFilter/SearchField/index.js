import React from 'react';
import {Box, IconButton, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchField = (props) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <TextField
                id="standard-basic"
                placeholder="Search beers..."
                variant="standard"
                value={props.filter.searchQuery}
                onChange={(e) => props.onChangeFilter({...props.filter, searchQuery: e.target.value})}
            />
            <IconButton
                type="submit"
            >
                <SearchIcon/>
            </IconButton>
        </Box>
    );
};

export default SearchField;