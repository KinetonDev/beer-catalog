import React from 'react';
import {Typography} from "@mui/material";
import FilterSliderOption from "../FilterSliderOption";
import useStyles from "./styles";
import advancedFilterOptions from "./advancedFilterOptions";

const AdvancedFilter = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.advancedFilterSection}>
            <Typography
                align="center"
                className={classes.advancedFilterTitle}
            >
                Filter results
            </Typography>
            <div>
                {advancedFilterOptions.map(option => (
                    <FilterSliderOption
                        label={option.label}
                        currentValue={props.filter[option.value]}
                        onChange={(newValue) => props.changeFilter({
                            ...props.filter,
                            [option.value]: newValue
                        })}
                        onChangeCommitted={(newValue) => props.changeFilterCommitted({
                           ...props.filter,
                           [option.value]: newValue
                        })}
                        max={option.max}
                        min={option.min}
                        step={option.step}
                        key={option.label}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdvancedFilter;