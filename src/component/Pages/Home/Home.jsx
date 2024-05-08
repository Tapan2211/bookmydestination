import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import Hero from "../../HeroSection/Hero";
import { CircularProgress, Box } from "@mui/material";
import styles from './Home.module.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { fetchCities } from '../../Api/Api';
import Cards from "../../Card/Card";
import Footer from '../../Footer/Footer';

function Home(){

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=>{
        const fetchCity =  async () =>{
            try {
                const data = await fetchCities();
                setCities(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                toast.error('Fetching error cities', error)
            }
        }
        fetchCity();
    },[])

    const filteredCities = cities.filter(city => city.city.toLowerCase().includes(searchQuery.toLowerCase()));

    return(
        <div>
            <Navbar/>
            <Hero setSearchQuery={setSearchQuery}/>
            <div className={styles.list}>
            {
                isLoading ? (
                    <Box>
                        <CircularProgress style={{ color: 'orange' }} />
                    </Box>
                ) : (
                    filteredCities.length > 0 ? (
                        filteredCities.map((city)=>(
                            <Box key={city.id}>
                                 <Cards cities={city} />
                            </Box>
                        ))
                    ) : (
                        <p>No cities found matching your search.</p>
                    )
                )
            }
            </div>
            <Footer/>
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

export default Home;
