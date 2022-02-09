import React, {useEffect} from 'react';
import BeerDetailsPage from "../pages/BeerDetailsPage";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentBeer} from "../redux/selectors";
import {getBeerByIdRequest} from "../redux/actions/actions";

const BeerDetailsPageContainer = () => {
    const { beerId } = useParams();
    const currentBeer = useSelector(state => selectCurrentBeer(state));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBeerByIdRequest({
            id: beerId
        }))
    }, []);

    return (
        (currentBeer.name ? <BeerDetailsPage
            currentBeer={currentBeer}
        /> : <div>Nothing</div>)
    );
};

export default BeerDetailsPageContainer;