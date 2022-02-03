import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    cardContent: {
        backgroundColor: "gray",
        color: "white",
    },
    cardMedia: {
        borderRadius: "50%",
        maxWidth: "100%",
        objectFit: "contain",
        padding: "10px 0"
    }
});

export default useStyles;