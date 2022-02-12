import {makeStyles} from "@mui/styles";

const useStyle = makeStyles({
    buttons: {
        display: "flex",
        justifyContent: "space-between",
        paddingTop: "20px"
    },
    inputs: {

    },
    input: {
        marginBottom: "10px",
        "&:last-child" : {
            marginBottom: "0px"
        }
    },
});

export default useStyle;