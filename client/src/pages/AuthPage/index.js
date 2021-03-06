import React from 'react';
import useStyle from './styles'

const AuthPage = ({children}) => {
    const classes = useStyle();

    return (
        <div className={classes.container}>
            <div className={classes.background}>
                <div className={classes.blurredBackground}></div>
            </div>
            <div className={classes.userForm}>
                {children}
            </div>
        </div>
    );
};

export default AuthPage;