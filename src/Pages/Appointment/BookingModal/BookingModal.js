import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import useAuth from '../../../Hooks/useAuth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BookingModal = ({ openBooking, handleBookingClose, booking, date , setAppointmentAlert }) => {

    const { name, time } = booking;
    const { user } = useAuth();

    const patentInformation = { patentName: user.displayName, patentEmail: user.email, patentPhone: '' };
    const [patentInfo, setPatentInfo] = useState(patentInformation);
    console.log(patentInfo);
    // patent info update ---------------------------------
    const patentInfoUpdate = (e) => {
        const value = e.target.value;
        const filled = e.target.filled;
        const newPatent = { ...patentInfo };
        newPatent[filled] = value;
        setPatentInfo(newPatent);
    }

    const handleBookingSubmit = e => {
        // colected data 
        const appointment = {
            ...patentInfo,
            time,
            serviceName: name,
            date: date.toLocaleDateString()
        }


        // send booking data 
        fetch('http://localhost:5000/appoinments' , {
            method:'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(appointment)
        })
        .then(res => res.json())
        .then(data => {
            setAppointmentAlert(true);
        })

        handleBookingClose();
        e.preventDefault();
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openBooking}
            onClose={handleBookingClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={openBooking}>
                <Box sx={style}>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        {name}
                    </Typography>
                    <form onSubmit={handleBookingSubmit}>
                        <TextField
                            disabled
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            defaultValue={time}
                            size="small"
                        />
                        <TextField
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            defaultValue={user?.displayName}
                            size="small"
                            name="patentName"
                            onChange={patentInfoUpdate}
                        />
                        <TextField
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            defaultValue={user?.email}
                            size="small"
                            name="patentEmail"
                            onChange={patentInfoUpdate}
                        />
                        <TextField
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            defaultValue="Phone Number"
                            size="small"
                            name="patentPhone"
                            onChange={patentInfoUpdate}
                        />
                        <TextField
                            disabled
                            sx={{ width: '90%', m: 1 }}
                            id="outlined-size-small"
                            defaultValue={date.toDateString()}
                            size="small"
                        />
                        <Button type="submit" variant="contained">Submit</Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default BookingModal;