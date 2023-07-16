import React, { useEffect, useState } from 'react'
import { Avatar, Button, IconButton, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImagePicker from '../../../ImagePicker';
import axios from 'axios';
import apiUrl from '../../../apiURL';
import Cookies from 'js-cookie';
import ProtectedRoute from '../../../ProtectedRoute';
import LinearProgress from '@mui/material/LinearProgress';


function BuyerProfile() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [profileIsEmpty, setProfileIsEmpty] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [BuyerName, setBuyerName] = useState('');
    const [BuyerEmail, setBuyerEmail] = useState('');
    const [BuyerDescription, setBuyerDescription] = useState('');
    const [dataURL, setDataURL] = useState('');
    const [isBuyer, setIsBuyer] = useState(true);

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
        setBuyerName(e.target.value);
    }

    const handleEmail = e => {
        setBuyerEmail(e.target.value);
    }

    const handleDescription = e => {
        setBuyerDescription(e.target.value);
    }


    const handleSave = async () => {
        setLoading(true);


        const formData = new FormData();
        formData.append('token', token);
        formData.append('file', selectedImage);
        try {
            const res = await axios.post(`${apiUrl}/app/buyer/create-buyer`, formData);
            console.log(res.data)
        }

        catch (error) {
            console.log(error);
            alert('error, please check the console')
        }



        setLoading(false)
    }

    const fetchBuyer = async () => {
        setLoading(true);
        const res = await axios.get(`${apiUrl}/app/Buyer/fetch-Buyer/${token}`);
        if (res.data.message == "No Buyer Data found") {
            console.log(res.data.message)
            setProfileIsEmpty(true);

        }

        else if (res.data.message == "OK") {
            setProfileData(res.data.BuyerData)
            setProfileIsEmpty(false)

        }
        setLoading(false)
    }

    useEffect(() => {
        if (ProtectedRoute()) {
            fetchBuyer();
        }

        else {
            navigate('/auth/login')
        }

    }, [])

    useEffect(() => {
        if (isBuyer)
            navigate('/app/ecommerce/Buyer/profile')

        else
            navigate('/app/ecommerce/buyer/home')
    }, [isBuyer])

    return (
        <>
            {
                loading ? (<LinearProgress />) : null
            }
            {
                profileIsEmpty ? (<>

                    <Typography style={{ "textAlign": "center", "marginTop": "10px" }} variant='h4'>Create Buyer Profile</Typography>
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

                    </div>


                    <div className="button-container" style={{ "textAlign": "center", "marginTop": "20px" }}>
                        <Button onClick={handleSave} variant="contained">Create Buyer Account</Button>

                    </div>
                </>) : (<>

                    {
                        profileData ? (<>
                            <div className="profile-header" style={{ "display": "flex", "alignItems": "center", "justifyContent": "center", "marginTop": "10px" }}>
                                <div className="profile-image-container">


                                    <img width={"80vh"} src={profileData.BuyerProfilePicURL} alt='Profile pic' />

                                </div>
                                <div className="user-details" style={{ "marginLeft": "20px" }}>
                                    <div className="username">
                                        <Typography variant='h5'>{profileData.BuyerName}</Typography>
                                    </div>
                                    <div className="email">
                                        <Typography variant='h6'>{profileData.BuyerEmail}</Typography>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-body" style={{ "textAlign": "center", "marginTop": "10px" }}>
                                <Typography variant='h6'>{profileData.BuyerDescription}</Typography>

                            </div>



                        </>) : null
                    }



                </>)
            }
        </>
    )
}

export default BuyerProfile