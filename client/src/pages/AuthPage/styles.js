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
        borderRadius: "12px",
        padding: "30px",
    },
    background: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        backgroundImage: "url(https://www.litra.md/public/menu/thumbs/version_1920x800x1/7a48604dd7237a48f355cb7333c19963.jpg)",
        backdropFilter: "blur(5px);"
    },
    blurredBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backdropFilter: "blur(25px)",
        zIndex: 1,
    }
});

export default useStyle;