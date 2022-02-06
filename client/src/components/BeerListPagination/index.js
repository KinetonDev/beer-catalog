import React from 'react';
import {Pagination} from "@mui/material";
import useStyle from "./styles";

const BeerListPagination = (props) => {
    const classes = useStyle();

    return (
        <Pagination
            className={classes.beerListPagination}
            count={props.totalPages}
            shape="rounded"
            page={props.page}
            onChange={props.onPageChange}
        />
    );
};

export default BeerListPagination;