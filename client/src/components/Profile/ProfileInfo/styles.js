import {makeStyles} from "@mui/styles";

const useStyle = makeStyles({
    textFields : {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center"
    },
    textField: {
        width: "40%",
        margin: "7px 0"
    },
    resultIcon: {
        marginLeft: "30px"
    },
    buttonBlock: {
        display: "flex",
        alignItems: "center"
    },
    cancel: {
        marginLeft: "auto"
    }
});

export default useStyle;