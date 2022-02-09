import React, {useCallback} from "react";
import {List, ListItem, Typography} from "@mui/material";
import ObjectDescribingList from "../ObjectDescribingList";

const IngredientsList = (props) => {
    const describeInnerProp = useCallback((propName, propValue) => {
        switch (propName) {
            case 'water':
                return <Typography variant="body2">{propValue.amount} {propValue.unit}</Typography>;
            case 'malt':
                return (
                    propValue.map((malt, index) => {
                        return(
                            <Typography
                                variant="body2"
                                key={index}
                            >
                                "{malt.name}" - {malt.amount.value} {malt.amount.unit}
                            </Typography>
                        )
                    })
                );
            case 'hops':
                return (
                    propValue.map((hop, index) => {
                        return(
                            <Typography
                                variant="body2"
                                key={index}
                            >
                                "{hop.name}" - {hop.amount.value} {hop.amount.unit}, {hop.add} {hop.attribute}
                            </Typography>
                        )
                    })
                )
            case 'yeast':
                return <Typography variant="body2">{propValue}</Typography>;
            default:
                return;
        }
    }, []);

    return(
        <ObjectDescribingList
            outlined={true}
            describing={props.ingredients}
            describeInnerProp={describeInnerProp}
        />
    )
}

export default IngredientsList;