import React from 'react';
import {Route, Routes} from "react-router-dom"
import LandingPageContainer from "../containers/LandingPageContainer";
import FavoritesPageContainer from "../containers/FavoritesPageContainer"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPageContainer/>}/>
            <Route path="/favorites" element={<FavoritesPageContainer/>}/>
        </Routes>
    );
};

export default AppRouter;