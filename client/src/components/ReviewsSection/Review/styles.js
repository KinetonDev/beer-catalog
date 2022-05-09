import {makeStyles} from "@mui/styles";

const useStyle = makeStyles({
    review: {
        display: "flex",
        alignItems: "flex-start",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    headerAuthor: {
        display: "flex",
        alignItems: "center"
    }
});

export default useStyle;