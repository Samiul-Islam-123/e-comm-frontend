import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SellerNavBar from './Seller/SellerNavBar';
import SellerProfile from './Seller/SellerProfile';
import ProtectedRoute from '../../ProtectedRoute';

function E_Commerce() {

    const navigate = useNavigate();

    useEffect(() => {
        if (ProtectedRoute()) {
            const isSeller = localStorage.getItem('isSeller');
            if (isSeller)
                navigate('/app/ecommerce/seller/profile');

            else
                navigate('/app/ecommerce/buyer/home')
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