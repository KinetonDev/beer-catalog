import React from 'react';
import {Typography} from "@mui/material";
import FilterSliderOption from "../FilterSliderOption";
import useStyles from "./styles";
import advancedFilterOptions from "./advancedFilterOptions";

const AdvancedFilter = ({filter, changeFilter, changeFilterCommitted}) => {
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
                        currentValue={filter[option.value]}
                        onChange={(newValue) => changeFilter({
                            ...filter,
                            [option.value]: newValue
                        })}
                        onChangeCommitted={(newValue) => changeFilterCommitted({
                           ...filter,
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