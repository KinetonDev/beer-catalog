import React from 'react';
import {Typography} from "@mui/material";
import FilterSliderOption from "../FilterSliderOption";
import useStyles from "./styles";
import advancedFilterOptions from "./advancedFilterOptions";
import {FormattedMessage} from "react-intl";

const AdvancedFilter = ({filter, changeFilter, changeFilterCommitted}) => {
    const classes = useStyles();

    return (
        <div className={classes.advancedFilterSection}>
            <Typography
                align="center"
                className={classes.advancedFilterTitle}
            >
                <FormattedMessage
                    description="filter results title"
                    defaultMessage="Filter results"
                    id="landing.filter.title"
                />
            </Typography>
            <div>
                {advancedFilterOptions.map(option => (
                    <FilterSliderOption
                        localeId={option.localeId}
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
                        key={option.localeId}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdvancedFilter;