import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiUrl from '../../../apiURL';
import LinearProgress from '@mui/material/LinearProgress';
import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


function SellerOrders() {

    const navigate = useNavigate();
    const [Orders, setOrders] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = Cookies.get('access_token');
    const fetchOrder = async () => {
        setLoading(true);
        //api call
        const res = await axios.get(`${apiUrl}/app/seller/fetch-order/${token}`);
        if (res.data.message == "OK") {
            setOrders(res.data.Orders)
        }

        else {
            alert(res.data.message);
            console.log(res.data)
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchOrder();
    }, [])

    return (
        <>
            <Typography variant='h4' style={{ "margin": "20px" }}>
                My Orders
            </Typography>
            {
                loading ? (<LinearProgress />) : null
            }

            {
                Orders ? (<>
                    {
                        Orders.map(item => {
                            return (<>
                                <div className="Order-container" style={{ "marginTop": "10px" }}>
                                    <Card>
                                        <CardActionArea onClick={() => {
                                            navigate('/app/ecommerce/seller/orders/details/' + item._id)
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
                                                        } else if (item.Status === "Delivered") {
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
                </>) : (<>No orders found</>)
            }
        </>
    )
}

export default SellerOrders