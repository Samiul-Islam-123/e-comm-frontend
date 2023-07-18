import { CardContent, Typography, Card, TextField, Button } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import apiUrl from '../../../apiURL';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';



function DeliverOrder() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [ContentDescription, setContentDescription] = useState(null)
    const [TotalfileSize, setTotalFileSize] = useState(null);
    var fileSize = 0;

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles([...selectedFiles, ...files]);

        // Calculate total file size
        fileSize = selectedFiles.reduce((accumulator, file) => {
            return accumulator + file.size;
        }, 0);
        setTotalFileSize(formatDataSize(fileSize))
    };

    const handleFormSubmit = async () => {
        setLoading(true);
        if (selectedFiles.length != 0) {
            const token = Cookies.get('access_token');
            const formData = new FormData();
            selectedFiles.forEach((file) => {
                formData.append('files', file);
            });
            formData.append('token', token)
            formData.append('ContentDescription', ContentDescription)


            // Send formData to the backend API
            const res = await axios.post(`${apiUrl}/app/seller/deliver-order`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            });

            if (res.data.message == "OK") {
                alert('Order Delivered Successfully')
                navigate('/app/ecommerce/seller/orders')
            }

            else {
                console.log(res.data);
                alert(res.data.message)
            }
        }

        else {
            alert("Please Select files")
        }

        setLoading(false);
    };

    function formatDataSize(bytes) {
        const kilobyte = 1024;
        const megabyte = kilobyte * 1024;
        const gigabyte = megabyte * 1024;

        if (bytes < kilobyte) {
            return bytes + ' B';
        } else if (bytes < megabyte) {
            return (bytes / kilobyte).toFixed(2) + ' KB';
        } else if (bytes < gigabyte) {
            return (bytes / megabyte).toFixed(2) + ' MB';
        } else {
            return (bytes / gigabyte).toFixed(2) + ' GB';
        }
    }



    return (
        <>


            <Card style={{ marginTop: '10px' }}>
                <CardContent>
                    <Typography variant="h5">Deliver your Order</Typography>
                    <div style={{ marginTop: '10px', "display": "flex", "justifyContent": "space-between", "alignItems": "center" }}>
                        <input type="file" multiple onChange={handleFileChange} />
                        <Typography variant='h6'> Size : {TotalfileSize}</Typography>
                        <Button variant='outlined' onClick={handleFormSubmit}>
                            {
                                loading ? (<CircularProgress />) : (<>Upload</>)
                            }

                        </Button>
                    </div>

                </CardContent>
            </Card>
        </>
    )
}

export default DeliverOrder