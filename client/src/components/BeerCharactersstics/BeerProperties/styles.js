import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    listItem: {
        alignItems: "center",
        borderBottom: "1px solid lightGray",
        padding: "12px",
        "&:last-child" : {
            borderBottom: "none",
        }
    },
    listOutlined: {
        borderRadius: "2%",
        border: "1px solid lightGray",
        padding: "0",

    },
    listLabel: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "45px"
    },
    listItemValue: {
        marginLeft: "auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        backgroundColor: "gray",
        width: "57px",
    }
});

export default useStyles;