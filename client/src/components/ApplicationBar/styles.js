import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    menuIcon: {
        color: "#ffffff"
    },
    appTitle: {
        fontWeight: "bold"
    },
    transparentBackdrop: {
        backgroundColor: "rgba(0,0,0,0)"
    },
    drawerTopBox: {
        padding: "20px"
    },
    tools: {
        display: "flex",
        alignItems: "center",
        width: "100%"
    },
    lang: {
        margin: "0 15px 0 auto"
    }
});

export default useStyles;