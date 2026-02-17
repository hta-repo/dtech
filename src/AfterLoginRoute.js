import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AfterLoginRoute = () => {

    const user = JSON.parse(localStorage.getItem("loggedUser"));
    let token = user ? user.token : '';

    if (token && token !== '') {
        return <Navigate to="/" />;
    } else {
        return <Outlet />;
    }
};

export default AfterLoginRoute;
