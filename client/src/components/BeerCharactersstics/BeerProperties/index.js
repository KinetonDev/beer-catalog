import React from 'react';
import advancedFilterOptions from "../../BeersFilter/AdvancedFilter/advancedFilterOptions";
import {Chip, List, ListItem, Tooltip, Typography} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import useStyle from './styles'

const BeerProperties = (props) => {
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
                        <Tooltip title={option.label} placement="right">
                            <InfoIcon/>
                        </Tooltip>
                        <Chip label={props.currentBeer[option.value]} className={classes.listItemValue}/>
                    </ListItem>
                )
            })}
        </List>
    );
};

export default BeerProperties;