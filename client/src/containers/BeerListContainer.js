import React, {useCallback, useState} from 'react';
import BeerList from "../components/BeerList";
import favoritesMock from "../pages/FavoritesPage/favoritesMock";
import {Pagination} from "@mui/material";
import BeerListPagination from "../components/BeerListPagination";
import {useNavigate} from "react-router-dom";

const BeerListContainer = () => {
    const favorites = [...favoritesMock];
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const navigate = useNavigate();

    const handlePageChange = (_, page) => {
        setPage(page)
        console.log(page)
    };

    const handleNavigation = useCallback((beerId) => {
        navigate(`/${beerId}`);
    });

    return (
        <div>
            <BeerList
                favorites={favorites}
                handleNavigation={handleNavigation}
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