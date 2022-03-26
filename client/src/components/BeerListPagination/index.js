import React from 'react';
import {Pagination} from "@mui/material";
import useStyle from "./styles";

const BeerListPagination = ({totalPages, page, onPageChange}) => {
    const classes = useStyle();

    return (
        <Pagination
            className={classes.beerListPagination}
            count={totalPages}
            shape="rounded"
            page={page}
            onChange={onPageChange}
        />
    );
};

export default BeerListPagination;