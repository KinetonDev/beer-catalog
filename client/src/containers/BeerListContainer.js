import React, {useCallback, useState} from 'react';
import BeerList from "../components/BeerList";
import {useNavigate} from "react-router-dom";

const BeerListContainer = ({beers}) => {
    const navigate = useNavigate();

    const handleNavigation = useCallback((beerId) => {
        navigate(`/${beerId}`);
    }, []);

    return (
        <BeerList
            favorites={beers}
            handleNavigation={handleNavigation}
        />
    );
};

export default BeerListContainer;