import {makeStyles} from "@mui/styles";

const useStyle = makeStyles({
    reviewsList: {
        padding: "20px 0",
        "&>div" : {
            marginBottom: "20px"
        },
        "&>div:last-child" : {
            marginBottom: "0"
        }
    }
});

export default useStyle;