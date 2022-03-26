import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import routes from "../../router/routes";

const applicationItems = [
    {
        title: "Home",
        icon: (<HomeIcon/>),
        path: routes.landing
    },
    {
        title: "Favorites",
        icon: <StarIcon/>,
        path: routes.favorites
    },
    {
        title: "Profile",
        icon: <PersonIcon/>,
        path: routes.profile
    }
];

export default applicationItems;