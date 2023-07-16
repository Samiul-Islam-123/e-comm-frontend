import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiUrl from '../../../apiURL'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Divider, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LinearProgress from '@mui/material/LinearProgress';
import Cookies from "js-cookie"

function BuyerProductDetails() {
    const navigate = useNavigate();

    const { productID } = useParams();

    const [loading, setLoading] = useState(false);
    const [productDetails, setProductDetails] = useState(null);

    const fetchProductDetails = async () => {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/app/seller/fetch-product-Details/${productID}`);
        if (res.data.message == "OK")
            setProductDetails(res.data.productDetails);

        else {
            console.log(res.data)
        }
        setLoading(false);
    }
    const token = Cookies.get('access_token');

    const pushItemToCart = async () => {
        const pushRes = await axios.post(`${apiUrl}/app/buyer/add-to-cart`, {
            token: token,
            productID: productID
        })

        if (pushRes.data.message == "OK")
            alert("Item Added to cart sucessfully")

        else {
            alert(pushRes.data.message)
            console.log(pushRes.data)
        }
    }

    const addToCart = async () => {
        //fetch Cart data

        //check that cart is present or not
        const PresenceRes = await axios.get(`${apiUrl}/app/buyer/fetch-cart-products/${token}`);
        if (PresenceRes.data.message == "NO") {
            //create a new cart
            const NewCartRes = await axios.post(`${apiUrl}/app/buyer/create-cart`, {
                token: token
            })

            if (NewCartRes.data.message == "OK") {
                //add current item to Cart
                pushItemToCart();
            }

        }

        else if (PresenceRes.data.message == "Buyer not found") {
            //navigate to buyer/profile
            navigate('/app/ecommerce/buyer/profile')
        }

        else if (PresenceRes.data.message == "OK") {
            //add item to cart
            pushItemToCart();
        }

        else {
            alert(PresenceRes.data.message)
            console.log(PresenceRes.data)
        }
    }



    useEffect(() => {
        fetchProductDetails();
    }, [])

    return (
        <>
            {
                productDetails ? (<>
                    {
                        loading ? (<><LinearProgress /></>) : (null)
                    }
                    <div className="product" style={{ "marginTop": "20px" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <div className="productImage">
                                    <img src={productDetails.ProductImageURL} alt='product image' style={{ maxWidth: '100%', height: 'auto' }} />
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <div className="productDetails" style={{ "marginTop": "20px" }}>
                                    <Typography variant='h4'>{productDetails.ProductName}</Typography>
                                    <div style={{ marginTop: "10px" }}></div>
                                    <Typography variant='h5'>Price: ${productDetails.Price}</Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ "margin": "20px" }}>
                        <Divider color="white" />
                    </div>
                    <div className="Description">
                        <Typography variant='h6'>{productDetails.ProductDescription}</Typography>
                    </div>
                    <div
                        style={{
                            "textAlign": "center",
                            "marginTop": "20px"
                        }}
                        className="Cart">
                        <Button
                            onClick={() => {
                                addToCart();
                            }}
                            variant="contained"
                            color="primary"
                            startIcon={<ShoppingCartIcon />}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </>) : null
            }
        </>
    )
}

export default BuyerProductDetails