import React from 'react';
import PropTypes from 'prop-types';
import {Skeleton} from "@mui/material";

const BeerCardSkeleton = () => {
    return (
        <div>
            <Skeleton variant={"rectangular"} height={150}/>
            <div style={{padding:"16px"}}>
                <Skeleton variant={"text"} width="40%" height={32}/>
                <Skeleton variant={"text"} width="60%" height={20}/>
            </div>
            <div style={{display: "flex", padding: "8px"}}>
                <Skeleton variant={"text"} width="15%" style={{marginRight: "10px"}} height={36}/>
                <Skeleton variant={"text"} width="15%" height={36}/>
            </div>
        </div>
    );
};

BeerCardSkeleton.propTypes = {};

export default BeerCardSkeleton;