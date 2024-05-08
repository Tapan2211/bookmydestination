import React, { useEffect, useState } from "react";
import styles from './AdventureDetail.module.css';
import { useParams } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';

import Navbar from "../../Navbar/Navbar";
import { fetchAdventureDetail } from '../../Api/Api';
import AdventureDetails from "../../AdventureDetails/AdventureDetails";
import Details from '../../Details/Details';

function AdventureDetail() {
    const { id } = useParams();
    const [adventure, setAdventure] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const fetchAdventureDetails = async () => {
            try {
                const data = await fetchAdventureDetail(id);
                setAdventure(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log('Fetching error adventure details', error);
            }
        }
        fetchAdventureDetails();
    }, [id])

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
                        {/* <AdventureDetails data={adventure} /> */}
                        <Details data={adventure} />
                    </div>
                )
            }

        </div>
    )
}

export default AdventureDetail;