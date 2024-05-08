import React, { useEffect, useState } from "react";
import styles from './Places.module.css';
import { useNavigate } from "react-router-dom";

function Places({ place }) {
    const navigate= useNavigate();
    const {id, name, costPerHead, currency, image, duration, category} = place;

    const handleClick =()=>{
        console.log(name)
        navigate(`/details/${id}`)
    }

    return (
        <div className={styles.main_div} onClick={handleClick}>
            <div className={styles.sub_div}>
                <img src={image} className={styles.image} />
                <div className={styles.category}>{category}</div>
                <div className={styles.content}>
                    <div>
                        <p>{name}</p>
                        <p>Duration</p>
                    </div>
                    <div>
                        <p>{currency === "INR" ? "₹" : "$"}{costPerHead}</p>
                        <p>{duration} Hours</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Places;
