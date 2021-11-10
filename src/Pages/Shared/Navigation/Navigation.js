import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../Hooks/useAuth';

const Navigation = () => {
    const { user, handleSignOut } = useAuth();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Doctors Portal
                    </Typography>
                    <Link to="/appointment"><Button color="inherit">Appointment</Button></Link>
                    <Link to="/login">
                        {
                            !user.email && <Button color="inherit">Login</Button>
                        }
                    </Link>
                    <Link to="/dashboard">
                        {
                            user.email && <Button color="inherit">Dashboard</Button>
                        }
                    </Link>
                    {user.email && <Button onClick={handleSignOut} color="inherit">Logout</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navigation;