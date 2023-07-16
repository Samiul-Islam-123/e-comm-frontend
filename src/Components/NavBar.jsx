import { React, useEffect, useState } from 'react'
import { AppBar, Box, IconButton, Toolbar, Typography, Button, ButtonGroup } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Switch } from '@mui/material';
import appName from '../AppName';
import SellerDrawyer from '../Apps/E_Commerce/Seller/SellerDrawyer';
import { useNavigate } from 'react-router-dom';
import BuyerDrawyer from '../Apps/E_Commerce/Buyer/BuyerDrawyer';

function NavBar(props) {

    const navigate = useNavigate()
    const [seller, setSeller] = useState(false);

    useEffect(() => {
        seller ? (navigate('/app/ecommerce/seller/profile')) : (navigate('/app/ecommerce/buyer/home'))
    }, [seller])

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        {
                            seller ? (<>
                                <SellerDrawyer>
                                    <IconButton>
                                        <MenuIcon />
                                    </IconButton>
                                </SellerDrawyer>
                            </>) : (<><BuyerDrawyer>
                                <IconButton>
                                    <MenuIcon />
                                </IconButton>
                            </BuyerDrawyer></>)
                        }



                        <Typography onClick={() => {
                            navigate("/")
                        }} style={{ "cursor": "pointer" }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {appName}
                        </Typography>

                        <Button variant='outlined' color='inherit' onClick={() => {
                            setSeller(!seller);
                        }}>
                            {
                                seller ? (<>Switch to Buyer</>) : (<>Switch to Seller</>)
                            }
                        </Button>

                        <Switch checked={props.darkMode} onChange={() => {
                            props.setDarkMode(!props.darkMode)

                        }} />

                    </Toolbar>
                </AppBar>
            </Box>
        </>
    )
}

export default NavBar