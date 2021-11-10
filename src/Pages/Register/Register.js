import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import login from '../../images/login.png';

const Register = () => {
    const [loginData, setLoginData] = useState({});
    const { user, handleRegister, isLoading, error } = useAuth();
    const history = useHistory();
    console.log(user);


    const handleChange = (e) => {
        const filled = e.target.name;
        const value = e.target.value;
        const newLoginData = { ...loginData };
        newLoginData[filled] = value;
        setLoginData(newLoginData);
        console.log(newLoginData);
    }
    // login submit---------------------------
    const handleLoginSubmit = (e) => {
        if (loginData.password !== loginData.password2) {
            alert('dont match password');
            return;
        }

        handleRegister(loginData.email, loginData.password, loginData.name, history);
        alert('submited')
        e.preventDefault();
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" component="h4">
                        Register
                    </Typography>
                    {!isLoading &&
                        <form onSubmit={handleLoginSubmit}>
                            <TextField
                                sx={{ width: '75%', m: 1 }}
                                name="name"
                                onChange={handleChange}
                                id="filled-basic"
                                label="name"
                                type="text"
                                variant="filled" />
                            <TextField
                                sx={{ width: '75%', m: 1 }}
                                name="email"
                                onChange={handleChange}
                                id="filled-basic"
                                label="email"
                                type="email"
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
                            <TextField
                                sx={{ width: '75%', m: 1 }}
                                name="password2"
                                onChange={handleChange}
                                id="outlined-password-input"
                                label="confirm password"
                                type="password"
                                autoComplete="current-password"
                            />
                            <Link to="login">
                                <Button variant="text">Already Registered ? Please Login</Button>
                            </Link>
                            <Button sx={{ width: '75%', m: 1 }} type="submit">
                                Register
                            </Button>
                        </form>
                    }
                    {isLoading && <h1>Loading</h1>}
                    {user.email && <p>user created succcesfully</p>}
                    <p>{error}</p>
                </Grid>
                <Grid item xs={12} md={6}>
                    <img src={login} alt="" />
                </Grid>

            </Grid>
        </Container>
    );
};

export default Register;