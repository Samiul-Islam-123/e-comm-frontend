import { AppBar, Divider, IconButton, Toolbar, Typography } from '@mui/material'
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import AddSellerProduct from './AddSellerProduct';
import DisplaySellerProducts from './DisplaySellerProducts';

function SellerProducts() {

    const [addProduct, setAddProduct] = useState(false);

    const navigate = useNavigate();
    return (
        <>

            <Toolbar>
                <Typography onClick={() => {
                    navigate('/app/ecommerce/seller/products')
                }} style={{ "flexGrow": 1, "cursor": "pointer" }} variant='h5'>My Products</Typography>
                <IconButton onClick={() => {
                    setAddProduct(!addProduct)
                }}>
                    <AddIcon />
                </IconButton>
            </Toolbar>

            <Divider />
            {
                addProduct ? (<AddSellerProduct />) : (<DisplaySellerProducts />)
            }
        </>

    )
}

export default SellerProducts