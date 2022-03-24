import React from 'react';
import BeerRecord from "../BeerRecord";
import {Stack} from "@mui/material";
import useStyle from "./styles"

const BeerList = (
    {
        favorites,
        handleNavigation,
        handleRemovingFavorite,
    }) => {
    return (
        <Stack
            alignItems="center"
        >
            {favorites.map(favorite => (
                <BeerRecord
                    key={favorite.id}
                    name={favorite.name}
                    tagline={favorite.tagline}
                    description={favorite.description}
                    alt={"Favorite beer"}
                    image={favorite.image_url}
                    onNavigate={() => {
                        handleNavigation(favorite.id);
                    }}
                    onFavoriteRemove={() => {
                        handleRemovingFavorite(favorite.id);
                    }}
                />
            ))}
        </Stack>
    );
};



export default BeerList;