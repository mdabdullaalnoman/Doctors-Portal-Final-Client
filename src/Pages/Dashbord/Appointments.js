import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';

const Appointments = ({date}) => {

    const [appointments, setAppointments] = useState([]);
    const { user } = useAuth();
    
    useEffect(() => {
        fetch(`http://localhost:5000/appoinments?email=${user.email}&date=${date}`)
            .then(res => res.json())
            .then(data => setAppointments(data))

            .catch(error => console.log(error.message));
    }, [date]);
    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {appointments.map((row) => (
                            <TableRow
                                key={row._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.patentName}
                                </TableCell>
                                <TableCell align="right">{row.patentEmail}</TableCell>
                              
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Appointments;