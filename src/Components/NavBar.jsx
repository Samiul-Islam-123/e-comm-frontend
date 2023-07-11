import { React, useState } from 'react'
import { AppBar, Box, IconButton, Toolbar, Typography, Button, ButtonGroup } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Switch } from '@mui/material';
import appName from '../AppName';
import SellerDrawyer from '../Apps/E_Commerce/Seller/SellerDrawyer';

function NavBar(props) {


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <SellerDrawyer>
                            <IconButton>
                                <MenuIcon />
                            </IconButton>
                        </SellerDrawyer>

                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            {appName}
                        </Typography>

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