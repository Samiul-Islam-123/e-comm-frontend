import { Card, CardActionArea, CardContent, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import appName from '../AppName'
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from "./../ProtectedRoute"
function Home() {

    const navigate = useNavigate();

    const [headingText, setHeadingText] = useState('');

    const animateText = (text) => {
        const textArr = text.split('');
        let finalText = '';
        textArr.map((item, index) => {
            setTimeout(() => {
                finalText = finalText + item;
                setHeadingText(finalText);
            }, (index + 1) * 100);
        });
    }

    useEffect(() => {
        if (ProtectedRoute())
            animateText("the only Saas that makes your life easier .")

        else {
            navigate('/auth/login')
        }
    }, [])
    return (
        <>
            <Typography variant='h2'>Welcome to </Typography> <Typography variant='h1'>{appName}</Typography> <Typography variant='h3'>{headingText}</Typography>

            <Divider />

            <Grid container spacing={2} style={{ "marginTop": "20px" }}>
                <Grid item xs={6}>
                    <Card>
                        <CardActionArea onClick={() => {
                            navigate('/app/ecommerce/')
                        }}>
                            <CardContent style={{ "textAlign": "center" }}>
                                E-commerce
                            </CardContent>
                        </CardActionArea>

                    </Card>
                </Grid>

                <Grid item xs={6}>
                    <Card>
                        <CardActionArea>
                            <CardContent style={{ "textAlign": "center" }}>
                                Video Chat
                            </CardContent>
                        </CardActionArea>

                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default Home