import React, { useEffect, useState } from "react";
import styles from './Place.module.css';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import Navbar from '../../Navbar/Navbar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { fetchPlaceByCity } from "../../Api/Api";
import Places from '../../Places/Places';
import Category from '../../Category/Category';

function Place() {
    const { id } = useParams();
    const [places, setPlaces] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchPlaceByCity(id);
                setPlaces(result);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                toast.error("Fetching error place", error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <div>
            <Navbar />
            <Category/>
            <div className={styles.main_div}>
                
                {isLoading ? (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="100vh"
                        flexDirection="column"
                    >
                        <CircularProgress style={{ color: 'orange' }} />
                    </Box>
                ) : (
                    places && places.map(place => (
                        <div key={place.id}>
                            <Places place={place} />
                        </div>
                    ))
                )}
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
    );
}

export default Place;
