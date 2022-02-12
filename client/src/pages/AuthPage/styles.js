import {makeStyles} from "@mui/styles";

const useStyle = makeStyles({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    userForm: {
        width: "630px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "30px"
    }
});

export default useStyle;