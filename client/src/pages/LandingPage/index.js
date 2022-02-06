import React from 'react';
import BeerGridContainer from "../../containers/BeerGridContainer";
import BeersFilterContainer from "../../containers/BeersFilterContainer";

const LandingPage = () => {
    return (
        <div>
            <BeersFilterContainer/>
            <BeerGridContainer/>
        </div>
    );
};

export default LandingPage;