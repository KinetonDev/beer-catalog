import {useSelector} from "react-redux";
import {selectBeers} from "../../redux/selectors";
import React from 'react';
import {Card, Typography, Grid} from "@mui/material";
import BeerCard from "../BeerCard";

const BeersList = (props) => {
    return (
        <Grid
            container
            spacing={10}
            alignItems="stretch"
            style={{
                    padding: "0 15%"
            }}
        >
            {props.beers.map(beer => {
                return (
                    <Grid item key={beer.id} xs={4}>
                        <BeerCard
                            image={beer.image_url}
                            alt={beer.name}
                            tagline={beer.tagline}
                            name={beer.name}
                        />
                    </Grid>
                )
            })}
        </Grid>
    );
};

export default BeersList;