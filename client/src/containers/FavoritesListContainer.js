import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import FavoritesList from "../components/FavoritesList";
import {useDispatch, useSelector} from "react-redux";
import {
    selectFavoriteBeer,
    selectIsFavoritesLoading,
    selectTotalFavoritePages,
    selectTotalFavoritesCount,
    selectUserId
} from "../redux/selectors";
import {getFavoriteBeersRequest, removeFavoriteBeerRequest} from "../redux/actions/actions";
import {favoritesPaginationPageSize} from "../constants";

const pageSize = 10;

const FavoritesListContainer = () => {
    const favorites = useSelector(state => selectFavoriteBeer(state));
    const isFavoritesLoading = useSelector(state => selectIsFavoritesLoading(state));
    const userId = useSelector(state => selectUserId(state));
    const [page, setPage] = useState(1);
    const totalPages = useSelector(state => selectTotalFavoritePages(state));
    const totalCount = useSelector(state => selectTotalFavoritesCount(state));
    const dispatch = useDispatch();

    const handlePageChange = useCallback((_, page) => {
        setPage(page)
    }, []);

    useEffect(() => {
        dispatch(getFavoriteBeersRequest({
            userId,
            page,
            perPage: favoritesPaginationPageSize
        }));
    }, [dispatch, page, userId]);

    const handleRemovingFavorite = useCallback((beerId) => {
        dispatch(removeFavoriteBeerRequest({
            beerId: beerId
        }));
    }, [dispatch]);

    return (
        <FavoritesList
            favorites={favorites}
            isFavoritesLoading={isFavoritesLoading}
            page={page}
            handlePageChange={handlePageChange}
            handleRemovingFavorite={handleRemovingFavorite}
            totalPages={totalPages}
            showPaginationPanel={totalCount > pageSize}
        />
    );
};

FavoritesListContainer.propTypes = {

};

export default FavoritesListContainer;