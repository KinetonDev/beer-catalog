import {makeStyles} from "@mui/styles";

const useStyle = makeStyles({
    textFieldSection: {
        display: "flex"
    },
    textField: {
        flexGrow: 1
    },
    buttons: {
        display: "flex",
        alignItems: "center",
        margin: "5px 0",
        "&>button" : {
            marginLeft: "10px"
        }
    },
    rating: {
        marginRight: "auto"
    }
});

export default useStyle;