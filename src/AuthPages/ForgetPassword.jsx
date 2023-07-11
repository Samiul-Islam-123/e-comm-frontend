import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Card, CardContent, LinearProgress } from "@mui/material";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../apiURL';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

function ForgetPassword() {

    const navigate = useNavigate();

    const [otp, setOTP] = useState(null)
    const [loading, setLoading] = useState(false);

    const forgetPass = async () => {
        const token = Cookies.get('access_token');
        //send req to generate OTP
        const res = await axios.post(`${apiUrl}/authentication/gen-OTP`, {
            token: token
        })
        console.log(res);
    }

    useEffect(() => {
        forgetPass()
    }, [])

    const changeOTP = e => {
        setOTP(e.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        //checking for all fields
        if (otp != null) {
            //verifying

            const res = await axios.post(apiUrl + "/authentication/verify", {
                otp: otp
            })
            if (res.data.message == 'OTP verified') {
                //navigate to login page
                navigate('/auth/login')
            }
            else
                alert(res.data.message)
        }
        else
            alert('please enter otp')
        setLoading(false);
    };

    return (
        <>
            {loading ? (<LinearProgress />) : null}
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    OTP Verification
                </Typography>

                <Typography variant="h6">
                    An OTP has been send to your email
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        onChange={changeOTP}
                        type='number'
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Enter OTP here"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />


                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Verify
                    </Button>
                    <Grid container>


                    </Grid>
                </Box>
            </Box>


        </>
    )
}

export default ForgetPassword