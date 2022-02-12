import React from 'react';
import {Route, Routes} from "react-router-dom"
import LandingPageContainer from "../containers/LandingPageContainer";
import FavoritesPageContainer from "../containers/FavoritesPageContainer"
import BeerDetailsPageContainer from "../containers/BeerDetailsPageContainer";
import AuthPage from "../pages/AuthPage";
import routes from "./routes";
import WithAppBar from "../layout/WithAppBar";
import WithoutAppBar from "../layout/WithoutAppBar";
import RegistrationForm from "../components/Auth/RegistrationForm";
import LoginForm from "../components/Auth/LoginForm";

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<WithAppBar/>}>
                <Route path={routes.landing}>
                    <Route index element={<LandingPageContainer/>}/>
                    <Route path={routes.beerDetails} element={<BeerDetailsPageContainer/>}/>
                </Route>
                <Route path={routes.favorites} element={<FavoritesPageContainer/>}/>
            </Route>
            <Route element={<WithoutAppBar/>}>
                <Route path={routes.register} element={<AuthPage><RegistrationForm/></AuthPage>}/>
                <Route path={routes.login} element={<AuthPage><LoginForm/></AuthPage>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;