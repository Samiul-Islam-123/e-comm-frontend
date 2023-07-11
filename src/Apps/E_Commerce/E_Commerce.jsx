import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SellerNavBar from './Seller/SellerNavBar';
import SellerProfile from './Seller/SellerProfile';
import ProtectedRoute from '../../ProtectedRoute';

function E_Commerce() {

    const navigate = useNavigate();

    useEffect(() => {
        if (ProtectedRoute()) {
            //set User role as seller in local storage
            // navigate to /seller/profile
            navigate('/app/ecommerce/seller/profile')
        }

        else {
            navigate('/auth/login')
        }

    }, [])

    return (<>

    </>

    )
}

export default E_Commerce