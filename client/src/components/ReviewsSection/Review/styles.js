import {makeStyles} from "@mui/styles";

const useStyle = makeStyles({
    review: {
        display: "flex",
        alignItems: "flex-start",
        borderRadius: "4px",
        width: "100%",
        padding: "10px 5px",
        "&:nth-child(even)" : {
            backgroundColor: "#F4F5FF"
        }
    },
    content: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        flexGrow: 1,
    },
    headerAuthor: {
        display: "flex",
        alignItems: "center"
    },
    main: {
        display: "flex",
        alignItems: "center"
    },
    deleteIcon: {
        marginLeft: "auto"
    }
});

export default useStyle;