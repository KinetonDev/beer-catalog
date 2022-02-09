import React, {useCallback} from "react";
import {List, ListItem, Typography} from "@mui/material";
import useStyle from './styles';

const ObjectDescribingList = (props) => {
    const classes = useStyle();

    const propNameToHumanReadable = useCallback((name) => {
        const mappedName = props.mapPropName ? props.mapPropName(name) : name;

        const parts = mappedName.split('_');
        const modifiedParts = parts.map(part => {
            return part.charAt(0).toUpperCase() + part.slice(1);
        })

        return modifiedParts.join(' ');
    }, []);

    return(
        <List className={classes.listOutlined}>
            {Object.getOwnPropertyNames(props.describing).map(propName => {
                if (props.describing[propName])
                    return (
                        <ListItem
                            key={propName}
                            className={classes.listItem + (
                                props.outlined !== undefined ?
                                    (" " + classes.listItemOutlined) :
                                "")}
                        >
                            <Typography
                                variant="body1"
                            >
                                {propNameToHumanReadable(propName)}
                            </Typography>
                            {props.describeInnerProp(propName, props.describing[propName])}
                        </ListItem>
                    )
            })}
        </List>
    )
}

export default ObjectDescribingList;