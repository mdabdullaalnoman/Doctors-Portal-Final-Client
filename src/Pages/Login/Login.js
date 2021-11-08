import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import login from '../../images/login.png';

const Login = () => {
    const [loginData , setLoginData] = useState({});
    const handleChange = (e) => {
        const filled = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData};
        newLoginData[filled] = value;
        setLoginData(newLoginData);
        console.log(newLoginData);
    }
    // login submit---------------------------
    const handleLoginSubmit = (e) => {
        
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{margin:'2rem 0'}} variant="h4" component="h4">
                        Login
                    </Typography>
                    <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            name="email"
                            onChange={handleChange}
                            id="filled-basic"
                            label="email"
                            variant="filled" />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            name="password"
                            onChange={handleChange}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />
                        <Link to="register">
                            <Button variant="text">Already login  ? Please register</Button>
                        </Link>
                        <Button sx={{ width: '75%', mt: 5 }} type="submit">
                            summit
                        </Button>
                    </form>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img style={{width:'100%' , height:'100vh'}} src={login} alt="" />
                </Grid>

            </Grid>
        </Container>
    );
};

export default Login;