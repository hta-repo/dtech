import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Redux
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
    const [isSubscribe, setisSubscribe] = useState(false);
    const { loggedUserInfo } = useSelector((state) => state.auth);

    const user = JSON.parse(localStorage.getItem("loggedUser"));
    let token = user ? user.token : '';

    useEffect(() => {
        if (token && token !== '') {
            if (loggedUserInfo && Object.entries(loggedUserInfo).length > 0) {
                setisSubscribe(true);
            }
        }
    }, [loggedUserInfo, token]);

    if (token && token !== '') {
        if (isSubscribe) {
            return <Outlet />;
        }
        // else {
        //     return <div>Loading...</div>;
        // }
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoutes;
