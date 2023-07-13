import React, { useEffect, useState } from 'react';
import { Card, CardActionArea, Typography, CardContent, Divider, Grid, TextField } from '@mui/material';
import axios from 'axios';
import apiUrl from '../../../apiURL';
import { useNavigate } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

function BuyerHome() {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/app/buyer/fetch-products-all`);
        if (res.data.message == "OK")
            setProducts(res.data.Products);

        else {
            alert(res.data.message, "please check the console");
            console.log(res.data)
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <>

            <div className="search-bar" style={{ "marginTop": "10px" }}>
                <TextField id="outlined-basic" label="Search products" variant="outlined" fullWidth />
            </div>
            {
                loading ? (<><LinearProgress /></>) : (null)
            }
            <div className="products" style={{ "marginTop": "10px" }}>
                <Grid container spacing={2}>
                    {
                        products ? (<>{
                            products.map((item) => {
                                return (<>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Card>
                                            <CardActionArea onClick={() => {
                                                navigate('/app/ecommerce/buyer/product-details/' + item._id);
                                            }}>
                                                <CardContent>
                                                    <img style={{ maxWidth: '100%', height: 'auto' }} src={item.ProductImageURL} alt=''></img>
                                                    <Typography variant="h5" component="h2">
                                                        {item.ProductName}
                                                    </Typography>
                                                    <Typography variant="h4" component="p">
                                                        $ {item.Price}
                                                    </Typography>



                                                </CardContent>
                                            </CardActionArea>

                                        </Card>
                                    </Grid>

                                </>)
                            })
                        }</>) : (<>No products found</>)
                    }


                </Grid>
            </div>
        </>
    )
}

export default BuyerHome