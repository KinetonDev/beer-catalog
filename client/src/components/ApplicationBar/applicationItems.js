import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import routes from "../../router/routes";
import {appRoles} from "../../constants";

const defaultShowOn = (role) => {
    return true;
};

const applicationItems = [
    {
        localeId: "applicationBar.home",
        icon: (<HomeIcon/>),
        path: routes.landing
    },
    {
        localeId: "applicationBar.favorites",
        icon: <StarIcon/>,
        path: routes.favorites
    },
    {
        localeId: "applicationBar.profile",
        icon: <PersonIcon/>,
        path: routes.profile
    },
    {
        localeId: "applicationBar.about",
        icon: <InfoIcon/>,
        path: routes.about
    },
    {
        localeId: "applicationBar.admin",
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