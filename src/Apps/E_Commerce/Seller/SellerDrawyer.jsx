import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useNavigate } from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect } from "react";
import axios from "axios";
import apiUrl from "../../../apiURL";
import Cookies from "js-cookie";
import Badge from '@mui/material/Badge';
import { useState } from "react";

export default function SellerDrawyer({ children }) {


    const navigate = useNavigate();

    const [orders, setOrders] = useState(0);


    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const fetchInfo = async () => {
        const token = Cookies.get('access_token')
        const res = await axios.get(`${apiUrl}/app/buyer/fetch-shopping-info/${token}`)
        if (res.data.message == "OK") {
            setOrders(res.data.Orders);
        }

        else {
            console.log(res.data);
            alert(res.data.message)
        }
    }

    useEffect(() => {
        //fetchInfo();
    })

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem disablePadding >
                    <ListItemButton onClick={() => {
                        navigate('/app/ecommerce/seller/profile')
                    }}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Seller Profile"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding >
                    <ListItemButton onClick={() => {
                        navigate('/app/ecommerce/seller/products')
                    }}>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary={"My Products"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding >
                    <ListItemButton onClick={() => {
                        navigate('/app/ecommerce/seller/orders')
                    }}>
                        <ListItemIcon>
                            <Badge badgeContent={orders} color="primary">
                                <ChecklistIcon />
                            </Badge>
                        </ListItemIcon>
                        <ListItemText primary={"My Orders"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding >
                    <ListItemButton onClick={() => {
                        navigate('/app/ecommerce/seller/analytics')
                    }}>
                        <ListItemIcon>
                            <AnalyticsIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Analytics"} />
                    </ListItemButton>
                </ListItem>


            </List>
            <Divider />
        </Box>
    );

    return (
        <div>
            <React.Fragment key={"left"}>
                <Button onClick={toggleDrawer("left", true)}>{children}</Button>
                <Drawer
                    anchor={"left"}
                    open={state["left"]}
                    onClose={toggleDrawer("left", false)}
                >
                    {list("left")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
