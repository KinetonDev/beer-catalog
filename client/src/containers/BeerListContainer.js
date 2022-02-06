import React, {useState} from 'react';
import BeerList from "../components/BeerList";
import favoritesMock from "../pages/FavoritesPage/favoritesMock";
import {Pagination} from "@mui/material";
import BeerListPagination from "../components/BeerListPagination";

const BeerListContainer = () => {
    const favorites = [...favoritesMock];
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);

    const handlePageChange = (_, page) => {
        setPage(page)
        console.log(page)
    };

    return (
        <div>
            <BeerList
                favorites={favorites}
            />
            <BeerListPagination
                totalPages={totalPages}
                page={page}
                onPageChange={handlePageChange}
            />
        </div>

    );
};

export default BeerListContainer;