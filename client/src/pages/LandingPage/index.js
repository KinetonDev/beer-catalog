import React from 'react';
import BeerGridContainer from "../../containers/BeerGridContainer";
import BeersFilterContainer from "../../containers/BeersFilterContainer";
import useStyle from "./styles";

const LandingPage = () => {
    const classes = useStyle();

    return (
        <div className={classes.landingPage}>
            <BeersFilterContainer/>
            <BeerGridContainer/>
        </div>
    );
};

export default LandingPage;