import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    cardContent: {
        backgroundColor: "gray",
        color: "white",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column"
    },
    cardMedia: {
        borderRadius: "50%",
        maxWidth: "100%",
        objectFit: "contain",
        padding: "10px 0"
    },
    card: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100%"
    },
    cardActions: {
        marginTop: "auto"
    }
});

export default useStyles;