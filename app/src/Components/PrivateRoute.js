import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Contexts/AuthContext';

const PrivateRoute =()=> {
    const { currentUser } = useAuth();

    return currentUser ? <Outlet /> : <Navigate to="/login" />
};

export default PrivateRoute;

/*
        <Route
            {...rest}
            render={props =>{
                return currentUser ? <Element {...props} /> : <Navigate to="/login" />
            }}
        />
*/