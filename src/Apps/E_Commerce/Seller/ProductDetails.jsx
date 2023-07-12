import React, { useEffect, useState } from 'react'
import { Avatar, Button, IconButton, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImagePicker from '../../../ImagePicker';
import axios from 'axios';
import apiUrl from '../../../apiURL';
import Cookies from 'js-cookie';
import ProtectedRoute from '../../../ProtectedRoute';
import LinearProgress from '@mui/material/LinearProgress';
import { useParams } from 'react-router-dom';


function ProductDetails() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [productDetails, setProductDetails] = useState(null)

    const token = Cookies.get('access_token');



    const fetchProductDetails = async () => {
        setLoading(true);
        console.log(id
        )
        const res = await axios.get(`${apiUrl}/app/seller/fetch-product-Details/${id}`);

        if (res.data.message == "OK") {
            setProductDetails(res.data.productDetails)
        }

        else {
            alert(res.data.message, "please check the console")
            console.log(res.data)
        }

        setLoading(false)
    }

    useEffect(() => {
        if (ProtectedRoute()) {
            fetchProductDetails();
        }

        else {
            navigate('/auth/login')
        }

    }, [])

    return (
        <>
            {
                loading ? (<LinearProgress />) : null
            }
            {
                !productDetails ? (<>No product details found</>) : (<>
                    <div className="profile-header" style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "marginTop": "10px" }}>
                        <div className="profile-image-container">


                            <img width={"150vh"} src={productDetails.ProductImageURL} alt='Profile pic' />

                        </div>
                        <div className="user-details" style={{ "marginLeft": "20px" }}>
                            <div className="username">
                                <Typography variant='h5'>{productDetails.ProductName}</Typography>
                            </div>
                            <div className="email">
                                <Typography variant='h6'>Price : ${productDetails.Price}</Typography>
                            </div>
                            <div className="email">
                                <Typography variant='h6'>Qty : {productDetails.Qty}</Typography>
                            </div>
                        </div>
                    </div>
                    <div className="profile-body" style={{ "textAlign": "center", "marginTop": "10px" }}>
                        <Typography variant='h6'>{productDetails.ProductDescription}</Typography>

                    </div>
                </>)
            }
        </>
    )
}

export default ProductDetails