import React from 'react';
import {Route, Routes} from "react-router-dom"
import LandingPageContainer from "../containers/LandingPageContainer";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPageContainer/>}/>
        </Routes>
    );
};

export default AppRouter;