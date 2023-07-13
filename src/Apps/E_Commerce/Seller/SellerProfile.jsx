import React, { useEffect, useState } from 'react'
import { Avatar, Button, IconButton, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImagePicker from '../../../ImagePicker';
import axios from 'axios';
import apiUrl from '../../../apiURL';
import Cookies from 'js-cookie';
import ProtectedRoute from '../../../ProtectedRoute';
import LinearProgress from '@mui/material/LinearProgress';


function SellerProfile() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [profileIsEmpty, setProfileIsEmpty] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [sellerName, setSellerName] = useState('');
    const [sellerEmail, setSellerEmail] = useState('');
    const [sellerDescription, setSellerDescription] = useState('');
    const [dataURL, setDataURL] = useState('');
    const [isSeller, setIsSeller] = useState(true);

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
        setSellerName(e.target.value);
    }

    const handleEmail = e => {
        setSellerEmail(e.target.value);
    }

    const handleDescription = e => {
        setSellerDescription(e.target.value);
    }


    const handleSave = async () => {
        setLoading(true);
        if (!sellerName || !sellerEmail || !sellerDescription || !selectedImage)
            alert('please fill all fields');

        else {

            const formData = new FormData();
            formData.append('SellerName', sellerName);
            formData.append('SellerEmail', sellerEmail);
            formData.append('SellerDescription', sellerDescription);
            formData.append('token', token);
            formData.append('file', selectedImage);

            try {
                const res = await axios.post(`${apiUrl}/app/seller/create-seller`, formData);
                if (res.data.message == "OK")
                    window.location.reload();

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

    const fetchSeller = async () => {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/app/seller/fetch-seller/${token}`);
        if (res.data.message == "No Seller Data found") {
            console.log(res.data.message)
            setProfileIsEmpty(true);

        }

        else if (res.data.message == "OK") {
            setProfileData(res.data.SellerData)
            setProfileIsEmpty(false)

        }
        setLoading(false)
    }

    useEffect(() => {
        if (ProtectedRoute()) {
            fetchSeller();
        }

        else {
            navigate('/auth/login')
        }

    }, [])

    useEffect(() => {
        if (isSeller)
            navigate('/app/ecommerce/seller/profile')

        else
            navigate('/app/ecommerce/buyer/home')
    }, [isSeller])

    return (
        <>
            {
                loading ? (<LinearProgress />) : null
            }
            {
                profileIsEmpty ? (<>

                    <Typography style={{ "textAlign": "center", "marginTop": "10px" }} variant='h4'>Create Seller Profile</Typography>
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
                                        <img width={"60%"} src={dataURL} alt="Selected" />
                                        <Button onClick={handleImageReset}>Reset</Button>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="user-details" style={{ "marginLeft": "20px" }}>
                            <div className="username">
                                <TextField onChange={handleUserName} id="standard-basic" label="Seller Name" variant="standard" />
                            </div>
                            <div className="email">
                                <TextField onChange={handleEmail} id="standard-basic" label="Email" variant="standard" />
                            </div>
                        </div>
                    </div>
                    <div className="profile-body" style={{ "textAlign": "center", "marginTop": "10px" }}>
                        <TextField onChange={handleDescription} id="standard-basic" label="Description" variant="standard" fullWidth />
                    </div>

                    <div className="button-container" style={{ "textAlign": "center", "marginTop": "20px" }}>
                        <Button onClick={handleSave} variant="contained">Save</Button>

                    </div>
                </>) : (<>

                    {
                        profileData ? (<>
                            <div className="profile-header" style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "marginTop": "10px" }}>
                                <div className="profile-image-container">


                                    <img width={"80vh"} src={profileData.SellerProfilePicURL} alt='Profile pic' />

                                </div>
                                <div className="user-details" style={{ "marginLeft": "20px" }}>
                                    <div className="username">
                                        <Typography variant='h5'>{profileData.SellerName}</Typography>
                                    </div>
                                    <div className="email">
                                        <Typography variant='h6'>{profileData.SellerEmail}</Typography>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-body" style={{ "textAlign": "center", "marginTop": "10px" }}>
                                <Typography variant='h6'>{profileData.SellerDescription}</Typography>

                            </div>



                        </>) : null
                    }



                </>)
            }
        </>
    )
}

export default SellerProfile