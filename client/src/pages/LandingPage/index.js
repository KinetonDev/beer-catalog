import React from 'react';
import BeerGridContainer from "../../containers/BeerGridContainer";
import BeersFilterContainer from "../../containers/BeersFilterContainer";
import useStyle from "./styles";

const LandingPage = ({page, setPage, perPage, beers, setFilter, filter, totalPages}) => {
    const classes = useStyle();

    return (
        <div className={classes.landingPage}>
            <BeersFilterContainer
                setPage={setPage}
                page={page}
                setFilter={setFilter}
                filter={filter}
            />
            <BeerGridContainer
                beers={beers}
                page={page}
                setPage={setPage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default LandingPage;