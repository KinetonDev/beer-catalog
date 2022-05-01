import React from 'react';
import advancedFilterOptions from "../../BeersFilter/AdvancedFilter/advancedFilterOptions";
import {Chip, List, ListItem, Tooltip, Typography} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import useStyle from './styles'
import {injectIntl} from "react-intl";

const BeerProperties = (
    {
        intl,
        currentBeer
    }
) => {
    const classes = useStyle();

    return (
        <List className={classes.listOutlined}>
            {advancedFilterOptions.map(option => {
                return (
                    <ListItem
                        key={option.value}
                        className={classes.listItem}
                    >
                        <Typography variant="body2" className={classes.listLabel}>{option.value.toUpperCase()}</Typography>
                        <Tooltip
                            title={intl.formatMessage({
                                id: option.localeId,
                                description: "Beer property hint",
                                defaultMessage: "Beer property hint"
                            })}
                            placement="right">
                            <InfoIcon/>
                        </Tooltip>
                        <Chip label={currentBeer[option.value]} className={classes.listItemValue}/>
                    </ListItem>
                )
            })}
        </List>
    );
};

export default injectIntl(BeerProperties);