import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    cardContent: {
        width: "320%"
    },
    cardMedia: {
        objectFit: "contain",
    },
    card: {
        display: "flex",
        alignItems: "center",
        minWidth: "100%",
        marginBottom: "15px",
        "&:last-child" : {
            marginBottom: "0"
        }
    },
    cardActions: {

    },
    cardTagline: {
        color: "rgb(169,169,169)",
        padding: "5px"
    }
});

export default useStyles;