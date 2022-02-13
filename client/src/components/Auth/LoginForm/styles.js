import {makeStyles} from "@mui/styles";


const useStyle = makeStyles({
    loginSection: {
        padding: "20px 30px",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        zIndex: 10,
        backgroundColor: "white"
    },
    loginHeader: {
        marginBottom: "20px"
    },
    input: {
        marginBottom: "10px",
        "&:last-child" : {
            marginBottom: "0px"
        }
    },
    submitButton: {
        marginTop: "30px"
    },
    loginForm: {
        display: "flex",
        flexDirection: "column"
    },
    registerHint: {
        paddingTop: "20px",
        display: "flex",
        flexDirection: "column"
    }
});

export default useStyle;