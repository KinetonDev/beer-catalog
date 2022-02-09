import React from 'react';
import {Route, Routes} from "react-router-dom"
import LandingPageContainer from "../containers/LandingPageContainer";
import FavoritesPageContainer from "../containers/FavoritesPageContainer"
import BeerDetailsPageContainer from "../containers/BeerDetailsPageContainer";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPageContainer/>}/>
            <Route path="/favorites" element={<FavoritesPageContainer/>}/>
            <Route path=":beerId" element={<BeerDetailsPageContainer/>}/>
        </Routes>
    );
};

export default AppRouter;