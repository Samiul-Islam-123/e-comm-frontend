import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, CardActionArea, CardContent, IconButton, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImagePicker from '../../../ImagePicker';
import axios from 'axios';
import apiUrl from '../../../apiURL';
import Cookies from 'js-cookie';
import ProtectedRoute from '../../../ProtectedRoute';
import LinearProgress from '@mui/material/LinearProgress';


function DisplaySellerProducts() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [status, setStatus] = useState(null);
    const [productData, setProductData] = useState(null);

    const token = Cookies.get('access_token');


    const fetchSellerProducts = async () => {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/app/seller/fetch-product-seller/${token}`);
        if (res.data.message == "No Products") {
            setStatus(res.data.message)

        }

        else if (res.data.message == "OK") {
            console.log(res.data)
            setStatus("OK")
            setProductData(res.data.products);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchSellerProducts();
    }, [])

    return (
        <>

            {
                loading ? (<LinearProgress />) : null
            }
            <div style={{ "marginTop": "20px" }}></div>
            {
                status == "OK" ? (<>
                    {
                        productData.map((item) => {
                            console.log(item._id)
                            return (<>
                                <Card style={{ "marginTop": "5px" }}>
                                    <CardActionArea onClick={() => {
                                        navigate('/app/ecommerce/seller/products/' + item._id);
                                    }}>
                                        <CardContent>
                                            <div className="profile-header" style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "marginTop": "10px" }}>
                                                <div className="profile-image-container">


                                                    <img width={"100vh"} src={item.ProductImageURL} alt='Profile pic' />

                                                </div>
                                                <div className="user-details" style={{ "marginLeft": "20px" }}>
                                                    <div className="username">
                                                        <Typography variant='h5'>{item.ProductName}</Typography>
                                                    </div>
                                                    <div className="email">
                                                        <Typography variant='h6'>Price : ${item.Price}</Typography>
                                                    </div>
                                                    <div className="email">
                                                        <Typography variant='h6'>Qty : {item.Qty}</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            </>)
                        })
                    }
                </>) : (<Typography variant='h5'>{status}</Typography>)
            }
        </>
    )
}

export default DisplaySellerProducts