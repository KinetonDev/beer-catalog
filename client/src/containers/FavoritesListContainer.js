import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import FavoritesList from "../components/FavoritesList";
import {useDispatch, useSelector} from "react-redux";
import {selectFavoriteBeer, selectIsFavoritesLoading, selectUserId} from "../redux/selectors";
import {getFavoriteBeersRequest} from "../redux/actions/actions";

const pageSize = 10;

const FavoritesListContainer = () => {
    const favorites = useSelector(state => selectFavoriteBeer(state));
    const isFavoritesLoading = useSelector(state => selectIsFavoritesLoading(state));
    const userId = useSelector(state => selectUserId(state));
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const dispatch = useDispatch();

    const handlePageChange = (_, page) => {
        setPage(page)
        console.log(page)
    };

    useEffect(() => {
        dispatch(getFavoriteBeersRequest({
            userId
        }));
    }, []);

    return (
        <FavoritesList
            favorites={favorites}
            isFavoritesLoading={isFavoritesLoading}
            page={page}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
            showPaginationPanel={favorites.length > pageSize}
        />
    );
};

FavoritesListContainer.propTypes = {

};

export default FavoritesListContainer;