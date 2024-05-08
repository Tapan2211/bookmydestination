import React, { useState } from "react";
import styles from './AdventureDetails.module.css';
import { TextField, Box, Stack, Button, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { reservationDate } from "../Api/Api";
import Carousels from '../Carousels/Carousels';

function AdventureDetails({ data }) {
    const { id, name, subtitle, images, content, reserved, available, costPerHead } = data;
    const [inputName, setInputName] = useState('');
    const [inputValue, setInputValue] = useState(0);
    const [finalAmout, setFinalAmount] = useState(0);
    const [selectedDate, setSelectedDate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successReservation, setSuccessReservation] = useState(false);

    const navigate = useNavigate();

    // Function to handle clicking on "explore" span
    const handleExploreClick = () => {
        navigate('/');
    };

    const hadleResvationClick = () =>{
        navigate('/reservation')
    }

    const calculateAmount = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        const TotalAmount = costPerHead * newValue;
        setFinalAmount(TotalAmount);
    }

    const validation = (data) => {
        if (data.name === '') {
            toast.warn("Name is a required field")
            return false
        } else if (data.date === '') {
            toast.warn("Date is a required field")
            return false
        } else if (data.personCount === '' || data.personCount === 0) {
            toast.warn("Person Count is a required field")
            return false
        } else {
            return true
        }
    }

    const handleForm = async (formData) => {
        if (!validation(formData)) {
            return false;
        }
        setIsLoading(true);
        try {
            const response = await reservationDate(formData);
            if (response.status === 200) {
                setIsLoading(false);
                toast.success("Reservation Successful");
                setSuccessReservation(true);
                window.location.reload();
            }

        } catch (error) {
            setIsLoading(false);
            setSuccessReservation(false);
            if (error.response && error.response.status === 400) {

                toast.error("Error :", error.response.status.message);
                setSuccessReservation(false);
            } else {
                toast.error("Error :", "Something went wrong. Check the backend is running and reachable.");
            }
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date.format('YYYY-MM-DD'));
    }


    return (
        
        <div>
            
            {
                reserved || successReservation ? (
                    <div className={styles.greeting}>
                        <p>Greetings! Reservation for this adventure is successful.
                            (Click <span style={{ cursor: 'pointer', fontWeight: '700', color:'#0f5132' }} onClick={hadleResvationClick}>here </span>
                            to view your reservations)</p>
                    </div>
                ) : (
                    <p></p>
                )
            }

            <div className={styles.main_div}>


                <div className={styles.content}>
                    <h2>{name}</h2>
                    <h4>{subtitle}</h4>
                    <Carousels images={images} />
                    <p >{content}</p>
                </div>

                <div className={styles.form}>

                    {
                        available ? (
                            <Box className={styles.input}>
                                <Stack spacing={2}>

                                    <TextField
                                        id="username"
                                        label="Username"
                                        variant="outlined"
                                        title="Name"
                                        name="Name"
                                        placeholder="Enter Name"
                                        fullWidth
                                        value={inputName}
                                        onChange={(e) => setInputName(e.target.value)}
                                    />

                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker label="Select Date" className={styles.date} onChange={handleDateChange} />
                                        </DemoContainer>
                                    </LocalizationProvider>

                                    <div className={styles.line}></div>

                                    <div className={styles.main_div1}>

                                        <div className={styles.left_div}>
                                            <p>Person's</p>
                                            <p>₹{costPerHead}</p>
                                        </div>

                                        <div className={styles.right_div}>
                                            <TextField
                                                id="outlined-basic"
                                                label="Count"
                                                variant="outlined"
                                                fullWidth
                                                type="number"
                                                className={styles.input}
                                                value={inputValue}
                                                onChange={calculateAmount}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.line}></div>

                                    <div className={styles.total}>
                                        <p>Total : </p>
                                        <p>₹{finalAmout}</p>
                                    </div>
                                    {
                                        isLoading ? (
                                            <Box
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                                height="100%"
                                            >
                                                <CircularProgress size={20} style={{ color: "orange" }} />
                                            </Box>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                style={{ backgroundColor: 'orange' }}
                                                onClick={() => handleForm({
                                                    adventure: id,
                                                    name: inputName,
                                                    date: selectedDate,
                                                    person: inputValue,
                                                    total: finalAmout
                                                })}>RESERVATION</Button>

                                        )

                                    }

                                </Stack>
                            </Box>

                        ) : (
                            <Box className={styles.input}>
                                <h2>Sold Out!</h2>
                                <div className={styles.line}></div>
                                <p>
                                    This activity is currently sold out. But there's a lot more to 
                                    <span
                                        style={{ color: 'orange', cursor: 'pointer' }}
                                        onClick={handleExploreClick}> explore
                                    </span>.
                                </p>
                            </Box>
                        )
                    }

                </div>

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
         </div>
    )
}

export default AdventureDetails;
