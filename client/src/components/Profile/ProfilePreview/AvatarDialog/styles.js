import {makeStyles} from "@mui/styles";

const useStyle = makeStyles({
    avatars: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
    actions: {
        display: "flex",
        justifyContent: "space-between"
    }
});

export default useStyle;