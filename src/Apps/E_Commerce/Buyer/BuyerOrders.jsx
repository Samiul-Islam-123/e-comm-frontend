import React, { useEffect, useState } from 'react'
import apiUrl from "./../../../apiURL"
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button, Card, CardContent, CardActionArea, Typography, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';

function BuyerOrders() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [Orders, setOrders] = useState(null);
    const [Status, setStatus] = useState(null);

    const token = Cookies.get('access_token');

    const fetchOrders = async () => {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/app/buyer/fetch-order-buyer/${token}`);
        if (res.data.message == "Buyer account not created") {
            navigate('/app/ecommerce/buyer/profile')
        }

        else if (res.data.message == "OK") {
            setOrders(res.data.OrderData)
        }

        else {
            setStatus(res.data.message)
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchOrders();
    }, [])

    return (<>
        {
            loading ? (<LinearProgress />) : null
        }

        {
            Status ? (<>
                <div style={{ "textAlign": "center", "marginTop": "10px" }}></div>
                {Status}

            </>) : null
        }

        <Typography variant='h4'>My Orders</Typography>

        {
            Orders ? (Orders ? (<>
                {
                    Orders.map(item => {
                        return (<>
                            <div className="Order-container" style={{ "marginTop": "10px" }}>
                                <Card>
                                    <CardActionArea onClick={() => {

                                        navigate('/app/ecommerce/buyer/orders/details/' + item._id)
                                    }}>
                                        <CardContent style={{ "display": "flex", "justifyContent": "space-between", "alignItems": "center" }}>
                                            <div className="productImage-container" >
                                                <img width={"100vh"} src={item.Product.ProductImageURL} alt='product Image container' />
                                            </div>
                                            <div className="product-info-container">
                                                <Typography variant='h5'>
                                                    {item.Product.ProductName.length > 10
                                                        ? `${item.Product.ProductName.substring(0, 10)}...`
                                                        : item.Product.ProductName}
                                                </Typography>

                                                <Typography variant='h6'>Price : ${item.Product.Price}</Typography>
                                            </div>
                                            <div className="buyer-image-container">
                                                <img width={"50px"} src={item.Destination.BuyerProfilePicURL} alt='Buyer Image container' />
                                                <Typography variant='h6'>{item.Destination.BuyerName}</Typography>
                                            </div>
                                            <div className="status-container">
                                                {(() => {
                                                    if (item.Status === "Confirmed") {
                                                        return (<>Confirmed <DoneAllIcon /></>);
                                                    } else if (item.Status === "Placed") {
                                                        return (<>Placed <CheckIcon /></>);
                                                    } else {
                                                        return (<>Delivered <CheckBoxIcon /></>)
                                                    }
                                                })()}
                                            </div>

                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </div>
                        </>)
                    })
                }
            </>) : (<>No orders found</>)) : null
        }

    </>

    )
}

export default BuyerOrders