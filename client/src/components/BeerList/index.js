import React from 'react';
import BeerRecord from "../BeerRecord";
import {Stack} from "@mui/material";
import useStyle from "./styles"

const BeerList = (props) => {
    return (
        <Stack
            alignItems="center"
        >
            {props.favorites.map(favorite => (
                <BeerRecord
                    key={favorite.id}
                    name={favorite.name}
                    tagline={favorite.tagline}
                    description={favorite.description}
                    alt={favorite.alt}
                    image={favorite.image_url}
                />
            ))}
        </Stack>
    );
};



export default BeerList;