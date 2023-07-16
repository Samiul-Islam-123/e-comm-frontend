import axios from 'axios'
import React, { useEffect, useState } from 'react'
import apiUrl from '../../../apiURL'
import { useParams } from 'react-router-dom'
import { Button, Divider, Grid, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LinearProgress from '@mui/material/LinearProgress';


function ProductDetails() {

    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [productDetails, setProductDetails] = useState(null);

    const fetchProductDetails = async () => {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/app/seller/fetch-product-Details/${id}`);
        if (res.data.message == "OK")
            setProductDetails(res.data.productDetails);

        else {
            console.log(res.data)
        }
        setLoading(false);
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

                    </div>
                </>) : null
            }
        </>
    )
}

export default ProductDetails