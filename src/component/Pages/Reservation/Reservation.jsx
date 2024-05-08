import React, { useEffect, useState } from "react";
import styles from './Reservation.module.css';
import Navbar from '../../Navbar/Navbar';
import { CircularProgress, Box } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReservationList from '../../ReservationList/ReservationList';
import { fetchReservationList } from "../../Api/Api";

function Reservation() {
    const [reservation, setReservationList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchReservationLists = async () => {
            try {
                const data = await fetchReservationList();
                const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
                setReservationList(sortedData);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                toast.error('Fetching error list', error);
            }
        }
        fetchReservationLists();
    }, [])


    return (
        <div>
            <Navbar />
            {
                isLoading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                        flexDirection="column">
                        <CircularProgress style={{ color: 'orange' }} />
                    </Box>
                ) : (
                    <div>
                        <ReservationList data={reservation} />
                    </div>
                )
            }

            <ToastContainer position='bottom-center'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='light' />

        </div>
    )
}

export default Reservation;