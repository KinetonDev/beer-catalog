import React from 'react';
import {
    AppBar,
    Drawer,
    IconButton,
    ListItemButton,
    Toolbar,
    Typography,
    List,
    Box,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import applicationItems from "./applicationItems";
import useStyles from "./styles";

const ApplicationBar = (
    {
        role,
        isDrawerOpened,
        onNavigate,
        setIsDrawerOpened
    }
) => {
    const classes = useStyles();

    return (
        <AppBar
            position="static"
            className={classes.appBar}
        >
            <Toolbar
                disableGutters={true}
            >
                <IconButton
                    onClick={() => setIsDrawerOpened(isOpened => !isOpened)}
                >
                    <MenuIcon className={classes.menuIcon}/>
                </IconButton>
                <Typography
                    className={classes.appTitle}
                >
                    Beer Catalog
                </Typography>
                <Drawer
                    anchor="left"
                    variant="temporary"
                    open={isDrawerOpened}
                    onClose={() => setIsDrawerOpened(isOpened => !isOpened)}
                    ModalProps={{
                        BackdropProps: {
                            className: classes.transparentBackdrop
                        }
                    }}
                    PaperProps={{
                        sx: { width: "300px" }
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            height: "180px",
                            backgroundColor: "#1976d2",
                            paddingLeft: "30px",
                            paddingTop: "30px",
                            color: "#ffffff"
                        }}
                    >
                        <Typography
                            className={classes.appTitle}
                        >
                            Beer Catalog
                        </Typography>
                    </Box>
                    <List>
                        {applicationItems.map(item => {
                            return (item.showOn(role) ?
                                ((
                                    <ListItemButton
                                        key={item.title}
                                        onClick={() => onNavigate(item.path)}
                                    >
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText>
                                            {item.title}
                                        </ListItemText>
                                    </ListItemButton>
                                )) : null);
                        })}
                    </List>
                </Drawer>
            </Toolbar>
        </AppBar>
    );
};

export default ApplicationBar;