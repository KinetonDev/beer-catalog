import React from 'react';
import {CircularProgress, Grid} from "@mui/material";
import BeerCard from "../BeerCard";
import useStyle from "./styles";
import BeerCardSkeleton from "../BeerCard/BeerCardSkeleton";

const BeerGrid = (
    {
        beers,
        endNotReached,
        observableElement,
        handleAddingFavorite,
        handleRemovingFavorite,
        handleNavigation,
        firstBeersLoading
    }) => {
    const classes = useStyle();

    return (
         <div className={classes.beerList}>
             <Grid
                 container
                 spacing={10}
                 alignItems="stretch"
             >
                 {beers.map(beer => {
                     return (
                         <Grid item key={beer.id} xs={4}>
                             {!firstBeersLoading ? (
                                 <BeerCard
                                     image={beer.image_url}
                                     alt={beer.name}
                                     tagline={beer.tagline}
                                     name={beer.name}
                                     isFavorite={beer.is_favorite}
                                     onNavigate={() => {
                                         handleNavigation(beer.id);
                                     }}
                                     onFavoriteAdd={() => {
                                         handleAddingFavorite(beer.id);
                                     }}
                                     onFavoriteRemove={() => {
                                         handleRemovingFavorite(beer.id);
                                     }}
                                 />
                             ) : <BeerCardSkeleton/>}
                         </Grid>
                     )
                 })}
             </Grid>
             {(endNotReached) && <div
                 style={{
                     width: "100%",
                     height: "60px",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     padding: "50px 0 20px"
                 }}
                 ref={observableElement}
             >
                 <CircularProgress disableShrink/>
             </div>}
         </div>
    );
};

export default React.memo(BeerGrid);