import React, {useCallback, useEffect} from 'react';
import BeerDetailsPage from "../pages/BeerDetailsPage";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentBeer, selectUserRole} from "../redux/selectors";
import {
    addFavoriteBeerRequest, exportReviewsPdfRequest,
    getBeerByIdRequest,
    removeFavoriteBeerRequest
} from "../redux/actions/actions";
import Loader from "../components/PageLoader";
import {apiUrl} from "../redux/api_url";

const BeerDetailsPageContainer = () => {
    const { beerId } = useParams();
    const role = useSelector(selectUserRole);
    const { value: beer, isLoading } = useSelector(state => selectCurrentBeer(state));
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBeerByIdRequest({
            id: beerId
        }))
    }, []);
    
    const handleAddingFavorite = useCallback(() => {
        dispatch(addFavoriteBeerRequest({
            beer_id: beerId
        }));
    }, [beerId, dispatch]);
    
    const handleRemovingFavorite = useCallback(() => {
        dispatch(removeFavoriteBeerRequest({
            beerId
        }));
    }, [beerId, dispatch]);

    const handleExportReviewsAsPdf = useCallback(() => {
        fetch(apiUrl+`/admin/reviewsPdf/${beerId}`)
            .then(response => response.blob()
                .then(blob => {
                    const a = document.createElement("a");
                    a.href = window.URL.createObjectURL(blob);
                    a.download = response.headers.get("Content-Disposition")
                        .split(';')
                        .find(n => n.includes('filename='))
                        .replace('filename=', '')
                        .trim();
                    a.click();
                })
            );
    }, [beerId]);

    return (
        (isLoading ?
            <Loader/> :
            <BeerDetailsPage
                role={role}
                beerId={beerId}
                currentBeer={beer}
                handleAddingFavorite={handleAddingFavorite}
                handleRemovingFavorite={handleRemovingFavorite}
                handleExportReviewsAsPdf={handleExportReviewsAsPdf}
            />
        )
    );
};

export default BeerDetailsPageContainer;