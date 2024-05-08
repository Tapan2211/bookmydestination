import React from "react";
import styles from './Logo.module.css';
import LogoImage from '../../assets/traveller.png';

export const Logo = () => {
    return (
        <div>
            <img src={LogoImage} alt="logo" className={styles.img_style}/>
        </div>
    )
}