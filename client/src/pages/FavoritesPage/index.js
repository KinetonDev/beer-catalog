import React from 'react';
import useStyle from "./styles";
import FavoritesListContainer from "../../containers/FavoritesListContainer";

const FavoritesPage = () => {
    const classes = useStyle();

    return (
        <div className={classes.favoritesPage}>
            <FavoritesListContainer/>
        </div>
    );
};

export default FavoritesPage;