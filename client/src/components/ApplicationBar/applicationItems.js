import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';

const applicationItems = [
    {
        title: "Home",
        icon: (<HomeIcon/>),
        path: "/"
    },
    {
        title: "Favorites",
        icon: <StarIcon/>,
        path: "/favorites"
    }
];

export default applicationItems;