import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import login from '../../images/login.png';

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const { user, handleSignIn, isLoading, error, handleGoogleSignIn } = useAuth();

    const location = useLocation();
    const history = useHistory();

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
        handleSignIn(loginData.email, loginData.password, location, history);
        e.preventDefault();
    }

    // handle google sing in-------------------------------------
    const handleGoogleLogin = () => {
        handleGoogleSignIn(location, history);
    }
    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ margin: '2rem 0' }} variant="h4" component="h4">
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
                            Login
                        </Button>

                    </form>

                    {user.email && <p> user login successfully</p>}
                    <p>{error}</p>
                    <p>--------------------------------------</p>
                    <Button onClick={handleGoogleLogin}>
                        google signIn
                    </Button>
                    
                </Grid>

                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%', height: '100vh' }} src={login} alt="" />
                </Grid>
            </Grid>

        </Container>
    );
};

export default Login;