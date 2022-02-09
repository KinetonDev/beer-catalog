import React, {useEffect} from 'react';
import BeerDetailsPage from "../pages/BeerDetailsPage";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentBeer} from "../redux/selectors";
import {getBeerByIdRequest} from "../redux/actions/actions";
import Loader from "../components/BeerDetailsPageLoader";

const BeerDetailsPageContainer = () => {
    const { beerId } = useParams();
    const { value: beer, isLoading } = useSelector(state => selectCurrentBeer(state));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBeerByIdRequest({
            id: beerId
        }))
    }, []);

    return (
        (isLoading ?
            <Loader/> :
            <BeerDetailsPage
                currentBeer={beer}
            />
        )
    );
};

export default BeerDetailsPageContainer;