import {makeStyles} from "@mui/styles";

const useStyle = makeStyles({
    filterOption: {
        display: "flex",
        justifyContent: "flex-end",
        fontWeight: 700
    },
    filterLabel: {
        fontWeight: 600,
        marginRight: "auto"
    },
    filterValue: {
        width: "20px",
        fontWeight: 600,
        padding: "0 20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    filterSlider: {
        maxWidth: "30%"
    }
});

export default useStyle;