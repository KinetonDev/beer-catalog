import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
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
    },
    {
        title: "About",
        icon: <InfoIcon/>,
        path: routes.about
    }
];

export default applicationItems;