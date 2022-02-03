import React from 'react';
import {Slider, Typography} from "@mui/material";
import useStyle from "./styles";

const FilterSliderOption = (props) => {
    const classes = useStyle();

    return (
        <div className={classes.filterOption}>
            <Typography
                variant="body2"
                className={classes.filterLabel}
            >
                {props.label}
            </Typography>
            <Typography className={classes.filterValue}>{props.currentValue}</Typography>
            <Slider
                size="small"
                aria-label="Small"
                valueLabelDisplay="auto"
                max={props.max}
                min={props.min}
                value={props.currentValue}
                step={props.step}
                onChange={(e, newValue) => props.onChange(newValue)}
                className={classes.filterSlider}
            />
        </div>
    );
};

export default FilterSliderOption;