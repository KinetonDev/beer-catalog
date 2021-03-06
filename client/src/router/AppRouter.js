import React from 'react';
import {Redirect, Route, Routes} from "react-router-dom"
import LandingPageContainer from "../containers/LandingPageContainer";
import FavoritesPageContainer from "../containers/FavoritesPageContainer"
import BeerDetailsPageContainer from "../containers/BeerDetailsPageContainer";
import AuthPage from "../pages/AuthPage";
import routes from "./routes";
import WithAppBar from "../layout/WithAppBar";
import WithoutAppBar from "../layout/WithoutAppBar";
import RegistrationFormContainer from "../containers/Auth/RegisterFormContainer";
import LoginFormContainer from "../containers/Auth/LoginFormContainer";
import PrivateRoute from "./PrivateRoute";
import UserProfilePageContainer from "../containers/UserProfilePageContainer";
import AboutPage from "../pages/AboutPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute/>}>
                <Route element={<WithAppBar/>}>
                    <Route path={routes.landing}>
                        <Route index element={<LandingPageContainer/>}/>
                        <Route path={routes.beerDetails} element={<BeerDetailsPageContainer/>}/>
                    </Route>
                    <Route path={routes.favorites} element={<FavoritesPageContainer/>}/>
                    <Route path={routes.profile} element={<UserProfilePageContainer/>}/>
                    <Route path={routes.about} element={<AboutPage/>}/>
                </Route>
            </Route>
            <Route element={<WithoutAppBar/>}>
                <Route path={routes.register} element={<AuthPage><RegistrationFormContainer/></AuthPage>}/>
                <Route path={routes.login} element={<AuthPage><LoginFormContainer/></AuthPage>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;