import React from 'react';
import {CircularProgress, Grid} from "@mui/material";
import BeerCard from "../BeerCard";
import useStyle from "./styles";

const BeerGrid = (props) => {
    const classes = useStyle();

    return (
         <div className={classes.beerList}>
             <Grid
                 container
                 spacing={10}
                 alignItems="stretch"
             >
                 {props.beers.map(beer => {
                     return (
                         <Grid item key={beer.id} xs={4}>
                             <BeerCard
                                 image={beer.image_url}
                                 alt={beer.name}
                                 tagline={beer.tagline}
                                 name={beer.name}
                                 onNavigate={() => {
                                     props.handleNavigation(beer.id);
                                 }}
                             />
                         </Grid>
                     )
                 })}
             </Grid>
             {(props.endNotReached) && <div
                 style={{
                     width: "100%",
                     height: "40px",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center",
                     padding: "50px 0 20px"
                 }}
                 ref={props.observableElement}
             >
                 <CircularProgress disableShrink/>
             </div>}
         </div>
    );
};

export default React.memo(BeerGrid);