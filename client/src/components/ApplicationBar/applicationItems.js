import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import routes from "../../router/routes";
import {appRoles} from "../../constants";

const defaultShowOn = (role) => {
    return true;
}

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
    },
    {
        title: "Admin panel",
        icon: <AdminPanelSettingsIcon/>,
        path: routes.admin,
        showOn: (role) => {
            return role.toLowerCase() === appRoles.admin
        }
    }
];

applicationItems.forEach(item => {
    if (item.showOn === undefined) {
        item.showOn = defaultShowOn;
    }
})

export default applicationItems;