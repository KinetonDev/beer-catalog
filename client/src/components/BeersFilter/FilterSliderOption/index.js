import React from 'react';
import {Slider, Typography} from "@mui/material";
import useStyle from "./styles";
import {FormattedMessage} from "react-intl";

const FilterSliderOption = (
    {
        localeId,
        max,
        currentValue,
        min,
        onChange,
        step,
        onChangeCommitted
    }) => {
    const classes = useStyle();

    return (
        <div className={classes.filterOption}>
            <Typography
                variant="body2"
                className={classes.filterLabel}
            >
                <FormattedMessage
                    description="Advanced filter option"
                    defaultMessage="Advanced filter option"
                    id={localeId}
                />
            </Typography>
            <Typography className={classes.filterValue}>{currentValue[0]}</Typography>
            <Slider
                size="small"
                getAriaLabel={() => "Small"}
                valueLabelDisplay="auto"
                max={max}
                min={min}
                value={currentValue}
                step={step}
                onChange={(e, newValue) => onChange(newValue)}
                onChangeCommitted={(e, newValue) => onChangeCommitted(newValue)}
                className={classes.filterSlider}
                valueLabelDisplay="off"
            />
            <Typography className={classes.filterValue}>{currentValue[1]}</Typography>
        </div>
    );
};

export default FilterSliderOption;