import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
    const token = Cookies.get('access_token');

    // Check if token exists in the cookie
    if (!token) {
        // Redirect to the login page or any other route
        return false;
    }

    else
        return true;
};

export default ProtectedRoute;
