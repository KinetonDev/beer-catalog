import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    beerTagline: {
        color: "rgb(169,169,169)",
        fontStyle: "italic",
    },
    beerFavoritesButton: {
        margin: "13px 0"
    },
    beerMainDescription: {

    },
    beerHeader: {
        display: "flex",
        justifyContent: "space-between",
        padding: "8px 0"
    },
    beerImageWrapper: {
        height: "220px",
        width: "220px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    beerImage: {
        width: "auto",
        maxHeight: "100%"
    }
});

export default useStyles;