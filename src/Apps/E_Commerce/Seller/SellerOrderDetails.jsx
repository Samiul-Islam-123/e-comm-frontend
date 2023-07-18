import React, { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../../../apiURL';
import LinearProgress from '@mui/material/LinearProgress';
import { Button, Card, CardContent, Typography, TextField } from '@mui/material';

function SellerOrderDetails(props) {

    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const { orderID } = useParams();
    const [OrderDetails, setOrderDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [days, setDays] = useState(0);

    const [selectedDay, setSelectedDay] = useState('');

    const handleChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const fetchOrderDetails = async () => {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/app/seller/fetch-order-details/${orderID}`);

        if (res.data.message == "OK")
            setOrderDetails(res.data.OrderDetails)

        else {
            console.log(res.data);
            alert(res.data.message);
        }
        setLoading(false);

    }

    useEffect(() => {
        fetchOrderDetails();
    }, [])

    return (<>

        {loading ? (<LinearProgress />) : null}

        {
            OrderDetails ? (<>
                <Typography variant='h5'> Order Details</Typography>
                <div className="Seller-details" style={{ "marginTop": "10px" }}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6'>Seller</Typography>
                            <div style={{ "display": "flex", "justifyContent": "space-evenly" }}>

                                <div className="seller-image">
                                    <img width={"80px"} src={OrderDetails.Source.SellerProfilePicURL} alt='seller profile image' />

                                </div>

                                <div className="Seller-details" >
                                    <Typography variant='h6'>{OrderDetails.Source.SellerName}</Typography>
                                    <Typography variant='h7'>{OrderDetails.Source.SellerEmail}</Typography>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="product-details" style={{ "marginTop": "10px" }}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6'>Product</Typography>
                            <div style={{ "display": "flex", "justifyContent": "space-evenly" }}>
                                <div className="productimage-container">
                                    <img width={100} src={OrderDetails.Product.ProductImageURL} alt='product Image' />
                                </div>
                                <div className="product-details">
                                    <Typography variant='h6'>{OrderDetails.Product.ProductName}</Typography>
                                    <Typography variant='description' style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                                        {OrderDetails.Product.ProductDescription}
                                    </Typography>

                                </div>

                                <div className="pricing">
                                    <Typography variant='h5'>Price : ${OrderDetails.Product.Price}</Typography>
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="BuyerDetails" style={{ "marginTop": "10px" }}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6'>Buyer</Typography>
                            <div style={{ "display": "flex", "justifyContent": "space-evenly" }}>

                                <div className="buyer-image">
                                    <img width={"80px"} src={OrderDetails.Destination.BuyerProfilePicURL} alt='buyer profile image' />
                                </div>

                                <div className="Seller-details" >
                                    <Typography variant='h6'>{OrderDetails.Destination.BuyerName}</Typography>
                                    <Typography variant='h7'>{OrderDetails.Destination.BuyerEmail}</Typography>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>




                <div style={{ "textAlign": "center", "marginTop": "10px" }}>


                    {
                        OrderDetails.Status != 'Confirmed' ? (<>

                            <TextField onChange={(e) => {
                                setDays(e.target.value)
                            }} style={{ "paddingTop": "10px" }} id="outlined-basic" label="Set Number of Days to Deliver the Product" fullWidth type='number' variant="outlined" />


                            <Button variant='outlined' onClick={async () => {
                                if (days == 0)
                                    alert('Please Enter after how many days you will deliver the Product')

                                else {
                                    const res = await axios.post(`${apiUrl}/app/seller/confirm-order`, {
                                        orderID: orderID,

                                    })

                                    if (res.data.message == "OK")
                                        navigate('/app/ecommerce/seller/orders');
                                }
                            }}>Confirm Order</Button></>) : (<>
                                <Typography variant='h6'>Order is Confirmed</Typography>

                                <Button style={{ "marginTop": "10px" }} onClick={() => {
                                    navigate('/app/ecommerce/seller/deliver-order');
                                }} variant='outlined'>Deliver Now</Button>
                            </>)
                    }

                </div>
            </>) : (<>No orders found </>)
        }
    </>)
}

export default SellerOrderDetails