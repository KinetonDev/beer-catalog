import React from 'react';
import BeerGridContainer from "../../containers/BeerGridContainer";
import BeersFilterContainer from "../../containers/BeersFilterContainer";
import useStyle from "./styles";

const LandingPage = (
    {
        page,
        setPage,
        beers,
        setFilter,
        visualFilter,
        setVisualFilter,
        totalPages,
        firstBeersLoading
    }) => {
    const classes = useStyle();

    return (
        <div className={classes.landingPage}>
            <BeersFilterContainer
                setPage={setPage}
                page={page}
                setFilter={setFilter}
                setVisualFilter={setVisualFilter}
                visualFilter={visualFilter}
            />
            <BeerGridContainer
                firstBeersLoading={firstBeersLoading}
                beers={beers}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default LandingPage;