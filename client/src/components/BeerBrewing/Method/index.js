import React, {useCallback} from "react";
import {List, ListItem, Typography} from "@mui/material";
import ObjectDescribingList from "../ObjectDescribingList";

const MethodList = (props) => {
    const describeInnerProp = useCallback((propName, propValue) => {
        switch (propName) {
            case 'mash_temp':
                return (
                    propValue.map((mash, index) => {
                        return(
                            <Typography
                                variant="body2"
                                key={index}
                            >
                                {mash.duration} minutes at {mash.temp.value} {mash.temp.unit}
                            </Typography>
                        )
                    })
                );
            case 'fermentation':
                return (
                    <Typography
                        variant="body2"
                    >
                        Perform at {propValue.temp.value} {propValue.temp.unit}
                    </Typography>
                );
            case 'twist':
                return (
                    <Typography
                        variant="body2"
                    >
                        {propValue}
                    </Typography>
                );
            default:
                return;
        }
    }, []);

    return(
        <ObjectDescribingList
            describing={props.method}
            describeInnerProp={describeInnerProp}
            mapPropName={(name) => {
                if (name === "mash_temp")
                    return "mash";
                return name;
            }}
        />
    )
}

export default MethodList;