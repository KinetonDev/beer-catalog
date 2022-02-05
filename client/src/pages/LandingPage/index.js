import React from 'react';
import BeerListContainer from "../../containers/BeerListContainer";
import BeersFilterContainer from "../../containers/BeersFilterContainer";

const LandingPage = () => {
    return (
        <div>
            <BeersFilterContainer/>
            <BeerListContainer/>
        </div>
    );
};

export default LandingPage;