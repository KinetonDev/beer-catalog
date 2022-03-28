import {makeStyles} from "@mui/styles";

const useStyle = makeStyles({
    profilePreview: {
        width: "30%",
        border: "1px solid black",
        borderRadius: "30px",
        padding: "10px",
        display: "flex",
        flexDirection: "column"
    },
    profilePreviewContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    profilePreviewActions: {
        display: "flex",
        justifyContent: "center"
    }
});

export default useStyle;