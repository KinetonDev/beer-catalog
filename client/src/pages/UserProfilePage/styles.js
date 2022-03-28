import {makeStyles} from "@mui/styles";

const useStyle = makeStyles({
    profilePage: {
        maxWidth: "70%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        paddingTop: "20px",
        alignItems: "flex-start"
    },
    content: {
        width: "65%"
    }
});

export default useStyle;