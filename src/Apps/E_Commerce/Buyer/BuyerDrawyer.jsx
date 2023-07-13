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
import HomeIcon from '@mui/icons-material/Home';

export default function BuyerDrawyer({ children }) {

    const navigate = useNavigate();


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
                        navigate('/app/ecommerce/buyer/home')
                    }}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Home"} />
                    </ListItemButton>
                </ListItem>



                <ListItem disablePadding >
                    <ListItemButton onClick={() => {
                        navigate('/app/ecommerce/buyer/orders')
                    }}>
                        <ListItemIcon>
                            <ChecklistIcon />
                        </ListItemIcon>
                        <ListItemText primary={"My Orders"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding >
                    <ListItemButton onClick={() => {
                        navigate('/app/ecommerce/buyer/cart')
                    }}>
                        <ListItemIcon>
                            <ShoppingCartIcon />
                        </ListItemIcon>
                        <ListItemText primary={"My Cart"} />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding >
                    <ListItemButton onClick={() => {
                        navigate('/app/ecommerce/buyer/profile')
                    }}>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary={"My Profile"} />
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
