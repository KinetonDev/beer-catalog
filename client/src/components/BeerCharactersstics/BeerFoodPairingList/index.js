import React from 'react';
import {List, ListItem, Typography} from "@mui/material";
import useStyle from './styles'

const BeerFoodPairingList = (props) => {
    const classes = useStyle();

    return (
        <List className={classes.listOutlined}>
            {props.currentBeer.food_pairing.map(food => {
                return (
                    <ListItem
                        key={food}
                        className={classes.listItem}
                    >
                        <Typography
                            variant="body2"
                        >
                            {food}
                        </Typography>
                    </ListItem>
                )
            })}
        </List>
    );
};

export default BeerFoodPairingList;