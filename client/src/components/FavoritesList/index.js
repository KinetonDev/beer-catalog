import React from 'react';
import BeerListContainer from "../../containers/BeerListContainer";
import BeerListPagination from "../BeerListPagination";
import {Box, Typography} from "@mui/material";
import useStyle from './styles'
import Loader from "../PageLoader";

const FavoritesList = (
    {
        favorites,
        isFavoritesLoading,
        page,
        totalPages,
        showPaginationPanel,
        handlePageChange,
        handleRemovingFavorite,
    }) => {
    const classes = useStyle();

    return (
        <div>
            {isFavoritesLoading ?
                <Loader/> : <>
                    {favorites.length !== 0 ?
                        (
                            <>
                                <Typography
                                    align="center"
                                    variant="h4"
                                >
                                    Your favorite beers
                                </Typography>
                                <BeerListContainer
                                    beers={favorites}
                                    handleRemovingFavorite={handleRemovingFavorite}
                                />
                                {showPaginationPanel && <BeerListPagination
                                    totalPages={totalPages}
                                    page={page}
                                    onPageChange={handlePageChange}
                                />}
                            </>
                        ) : (
                            <>
                                <Typography
                                    align="center"
                                    variant="h4"
                                >
                                    Hey mate! Seems like you don't have favorites yet. Come and get some!
                                </Typography>
                                <div className={classes.img}>
                                    <Box
                                        component="img"
                                        alt="2 bottles of beer"
                                        src="https://us.123rf.com/450wm/jongjet303/jongjet3031703/jongjet303170300356/73757985-beer-bottle-icon-thin-line-for-web-and-mobile-modern-minimalistic-flat-design-.jpg?ver=6"
                                    />
                                </div>
                            </>
                        )
                    }
                </>
            }
        </div>
    );
};

FavoritesList.propTypes = {

};

export default FavoritesList;