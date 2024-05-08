import React, { useState } from "react";
import styles from './Hero.module.css';

function Hero({ setSearchQuery }) {

    const handleSearchCity = (event) =>{
        setSearchQuery(event.target.value);
    }

    return(
        <div className={styles.hero_image}>
            <h1>Welcome to MakeMyHoliday</h1>
            <p>
                Explore the world with fantastic places to venture around
            </p>
            <input className={styles.input} placeholder="Search a City" onChange={handleSearchCity}/>
        </div>
    )
}

export default Hero;