import { Divider, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';

function SellerNavBar() {
    return (
        <>
            <Toolbar style={{ "flexGrow": 1 }}>


                <Typography variant='h5'>Seller</Typography>

            </Toolbar>

            <Divider style={{ "marginBottom": "20px" }} />
        </>
    )
}

export default SellerNavBar