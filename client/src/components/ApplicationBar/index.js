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
    ListItemText, Button
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import applicationItems from "./applicationItems";
import useStyles from "./styles";
import {FormattedMessage} from "react-intl";
import {styled} from "@mui/styles";
import {LOCALES} from "../../lang/locales";

const WhiteTextButton = styled(Button)({
    color: "white",
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
});

const ApplicationBar = (
    {
        role,
        isDrawerOpened,
        onNavigate,
        setIsDrawerOpened,
        onLanguageChange,
        currentLocale
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
                <div className={classes.tools}>
                    <IconButton
                        onClick={() => setIsDrawerOpened(isOpened => !isOpened)}
                    >
                        <MenuIcon className={classes.menuIcon}/>
                    </IconButton>
                    <Typography
                        className={classes.appTitle}
                    >
                        <FormattedMessage
                            defaultMessage="Beer Catalog"
                            description="Application title"
                            id="applicationBar.title"
                        />
                    </Typography>
                    <WhiteTextButton onClick={onLanguageChange} className={classes.lang}>
                        <Typography>
                            {currentLocale.toUpperCase()}
                        </Typography>
                    </WhiteTextButton>
                </div>
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
                            <FormattedMessage
                                defaultMessage="Beer Catalog"
                                description="Application title"
                                id="applicationBar.title"
                            />
                        </Typography>
                    </Box>
                    <List>
                        {applicationItems.map(item => {
                            return (item.showOn(role) ?
                                ((
                                    <ListItemButton
                                        key={item.localeId}
                                        onClick={() => onNavigate(item.path)}
                                    >
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText>
                                            <Typography>
                                                <FormattedMessage
                                                    description="Application bar item"
                                                    defaultMessage="appbar item"
                                                    id={item.localeId}
                                                />
                                            </Typography>
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