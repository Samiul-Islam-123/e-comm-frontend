import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../../../apiURL';
import Cookies from 'js-cookie';
import LinearProgress from '@mui/material/LinearProgress';
import { Button, Card, CardActionArea, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import "./BuyerCart.css";

function BuyerCart() {

    const navigate = useNavigate();
    const [CartData, setCartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    const token = Cookies.get('access_token');
    const fetchCartData = async () => {
        setLoading(true)
        const PresenceRes = await axios.get(`${apiUrl}/app/buyer/fetch-cart-products/${token}`);

        if (PresenceRes.data.message == "Buyer not found") {
            //navigate to buyer/profile
            navigate('/app/ecommerce/buyer/profile')
        }

        else if (PresenceRes.data.message == "OK") {
            setCartData(PresenceRes.data.Cart)
        }

        else if (PresenceRes.data.message == "NO") {
            setStatus(PresenceRes.data.message)
        }

        else {
            alert(PresenceRes.data.message)
            console.log(PresenceRes.data)
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchCartData();
    }, [])

    var Price = 0;

    const DeleteProduct = async (productID, cartID) => {
        setLoading(true);
        const res = await axios.post(`${apiUrl}/app/buyer/delete-cart-product`, {
            cartId: cartID,
            productId: productID
        })
        alert('removed')
        setLoading(false);
    }

    const PlaceOrder = async () => {
        const CartProducts = CartData.CartProducts;
        CartProducts.map(async (item) => {
            console.log(item.products._id)
            const OrderRes = await axios.post(`${apiUrl}/app/buyer/place-order`, {
                token: token,
                ProductID: item.products._id
            })
            if (OrderRes.data.message != "OK") {
                console.log(OrderRes.data);
                alert(OrderRes.data.message)
            }

        })
    }

    const EmptyCart = async () => {
        const cartID = CartData._id;
        const EmptyCart = await axios.post(`${apiUrl}/app/buyer/empty-cart`, {
            cartID: cartID
        })
        if (EmptyCart.data.message == "OK") {
            navigate('/app/ecommerce/buyer/orders')
        }

        else {
            alert(EmptyCart.data.message);
            console.log(EmptyCart.data)
        }

    }

    return (
        <>
            {loading ? <LinearProgress /> : null}
            {CartData ? (
                <>
                    {CartData.CartProducts.map(item => {

                        Price += item.products.Price
                        return (
                            <>
                                <Card style={{ marginTop: "20px" }}>
                                    <CardContent>
                                        <div
                                            className="profile-header"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                marginTop: "10px",
                                            }}
                                        >
                                            <div className="profile-image-container">
                                                <img
                                                    width={"100vh"}
                                                    src={item.products.ProductImageURL}
                                                    alt="Profile pic"
                                                />
                                            </div>
                                            <div className="user-details" style={{ marginLeft: "20px" }}>
                                                <div className="username" style={{ display: "flex", alignItems: "center" }}>
                                                    <Typography variant="h5">
                                                        {item.products.ProductName.length > 15
                                                            ? `${item.products.ProductName.substring(0, 15)}...`
                                                            : item.products.ProductName}
                                                    </Typography>
                                                    <div style={{ marginLeft: "auto" }}>
                                                        <Button variant="outlined" onClick={() => {
                                                            DeleteProduct(item._id, CartData._id)
                                                        }}>
                                                            <DeleteIcon />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="email" style={{ marginTop: "10px" }}>
                                                    <Typography variant="description">
                                                        {item.products.ProductDescription}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div className="price-container" style={{ marginLeft: "auto" }}>
                                                <Typography>Price: ${item.products.Price}</Typography>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                                {/* Update the Price variable */}
                            </>
                        );
                    })}
                    <Card style={{ marginTop: "20px" }}>
                        <CardContent>
                            <div style={{ "display": "flex", "justifyContent": "space-between" }}>
                                <Typography variant='h5'>
                                    Total Items : {CartData.CartProducts.length}
                                </Typography>
                                <Typography variant='h5'>Total Price : $ {Price}</Typography>
                            </div>

                        </CardContent>
                    </Card>

                    <div className="btn" style={{ "marginTop": "20px", "textAlign": "center" }}>
                        <Button onClick={async () => {
                            await PlaceOrder();
                            await EmptyCart();
                            navigate('/app/ecommerce/buyer/orders')
                        }} variant='outlined'>Place Order</Button>
                    </div>
                </>
            ) : (
                <div style={{ marginTop: "20px", textAlign: "center" }}>No products found in Cart</div>
            )}
        </>
    );

}

export default BuyerCart