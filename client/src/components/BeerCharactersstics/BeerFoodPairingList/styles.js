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
});

export default useStyles;