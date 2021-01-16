import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const currentUser = true;

const PrivateRoute = ({component: Component, ...rest}) => {
    
    return (
        <Route
            {...rest}
            render={props =>{
                return currentUser ? <Component {...props} /> : <Redirect to="/login" />
            }}
        ></Route>
    );
};

export default PrivateRoute;