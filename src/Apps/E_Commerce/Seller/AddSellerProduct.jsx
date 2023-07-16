import React, { useEffect, useState } from 'react'
import { Avatar, Button, IconButton, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImagePicker from '../../../ImagePicker';
import axios from 'axios';
import apiUrl from '../../../apiURL';
import Cookies from 'js-cookie';
import ProtectedRoute from '../../../ProtectedRoute';
import LinearProgress from '@mui/material/LinearProgress';
function AddSellerProduct(props) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [profileIsEmpty, setProfileIsEmpty] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [ProductName, setProductName] = useState('');
    const [ProductPrice, setProductPrice] = useState('');
    const [ProductDescription, setProductDescription] = useState('');
    const [dataURL, setDataURL] = useState('');
    const [Qty, setQty] = useState(0);

    const [profileData, setProfileData] = useState(null);

    const token = Cookies.get('access_token');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        setDataURL(URL.createObjectURL(file))
    };


    const handleImageReset = () => {
        setSelectedImage(null);
    };

    const handleUserName = (e) => {
        setProductName(e.target.value);
    }

    const handlePrice = e => {
        setProductPrice(e.target.value);
    }

    const handleDescription = e => {
        setProductDescription(e.target.value);
    }

    const handleQty = e => {
        setQty(e.target.value)
    }


    const handleSave = async () => {
        setLoading(true);
        if (!ProductName || !ProductPrice || !ProductDescription || !selectedImage)
            alert('please fill all fields');

        else {

            const formData = new FormData();
            formData.append('ProductName', ProductName);
            formData.append('Price', ProductPrice);
            formData.append('ProductDescription', ProductDescription);
            formData.append('Qty', Qty);

            formData.append('token', token);
            formData.append('product-image', selectedImage);

            try {
                const res = await axios.post(`${apiUrl}/app/seller/add-product`, formData);
                if (res.data.message == "OK")
                    props.handleAddProduct(true); // Call the callback function with 'true'


                else
                    alert(res.data.message)
            }

            catch (error) {
                console.log(error);
                alert('error, please check the console')
            }


        }
        setLoading(false)
    }

    return (
        <>
            <Typography style={{ "textAlign": "center", "marginTop": "10px" }} variant='h4'>Create Your Product</Typography>
            <div className="profile-header" style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "marginTop": "10px" }}>
                <div className="profile-image-container">

                    <div>
                        <input
                            accept="image/*"
                            id="image-picker"
                            type="file"
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                        />
                        <label htmlFor="image-picker">
                            <Button variant="contained" component="span">
                                Select Image
                            </Button>
                        </label>
                        {selectedImage && (
                            <div>
                                <img width={"250px"} src={dataURL} alt="Selected" />
                                <Button onClick={handleImageReset}>Reset</Button>
                            </div>
                        )}
                    </div>

                </div>
                <div className="user-details" style={{ "marginLeft": "20px" }}>
                    <div className="username">
                        <TextField onChange={handleUserName} id="standard-basic" label="Product Name" variant="standard" />
                    </div>
                    <div className="Price">
                        <TextField onChange={handlePrice} id="standard-basic" label="Product Price (in $)" variant="standard" />
                    </div>
                    <div className="Price">
                        <TextField type='number' onChange={handleQty} id="standard-basic" label="Product Qty" variant="standard" />
                    </div>
                </div>
            </div>
            <div className="profile-body" style={{ "textAlign": "center", "marginTop": "10px" }}>
                <TextField onChange={handleDescription} id="standard-basic" label="Product Description" variant="standard" fullWidth />
            </div>

            <div className="button-container" style={{ "textAlign": "center", "marginTop": "20px" }}>
                <Button onClick={handleSave} variant="contained">Launch Product</Button>

            </div>
        </>
    )
}

export default AddSellerProduct