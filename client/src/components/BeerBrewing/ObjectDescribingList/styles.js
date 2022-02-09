import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    listItem: {
        flexDirection: "column",
        alignItems: "start",
        borderBottom: "1px solid lightGray",
        "&:last-child" : {
            borderBottom: "none",
        },
    },
    listOutlined: {
        borderRadius: "2%",
        border: "1px solid lightGray",
    }
});

export default useStyles;