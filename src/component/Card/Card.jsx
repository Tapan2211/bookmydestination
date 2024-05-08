import React, { useState, useEffect } from "react";
import styles from './Card.module.css';
import { Card, CardMedia, CardContent, Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";


function Cards({ cities }) {
    const { id, image, city, description } = cities;
    const navigate = useNavigate();

    const clickHanlde = async() =>{
        navigate(`/place/${id}`);
    }

    return (
        <Card sx={{ maxWidth: 300 }} className={styles.main} onClick={clickHanlde}>
            <CardMedia
                sx={{ height: 400, width: 300 }}
                image={image}
                title={city}
            >
                <CardContent className={styles.cardContent}>
                    <Typography variant="h5" component="div" color="white">
                        {city}
                    </Typography>
                    <Typography variant="body2" color="white">
                        {description}
                    </Typography>
                </CardContent>
            </CardMedia>
        </Card>
    );
}

export default Cards;

