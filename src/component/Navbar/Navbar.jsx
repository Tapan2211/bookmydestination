import React, { useState } from 'react';
import styles from './Navbar.module.css';
import { Logo } from '../Logo/Logo';
import { Link } from 'react-router-dom';

function Navbar() {

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <div className={styles.navbar}>
            <Link to="/">
                <div className={styles.logo}><Logo /></div>
            </Link>
            <div className={`${styles.menuIcon} ${showMenu ? styles.active : ''}`} onClick={toggleMenu}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
            </div>
            <div className={`${styles.menu} ${showMenu ? styles.show : ''}`}>
                <Link to="/">Home</Link>
                <Link to="/reservation">Reservation</Link>
                <Link to="/about">About</Link>
            </div>

        </div>

    );
}

export default Navbar;

// import React, {useState} from "react";
// import styles from './Navbar.module.css';

// import { Link, useNavigate } from 'react-router-dom';
// import {Logo} from '../Logo/Logo';

// function Navbar() {

//     // const nav = useNavigate();
//     const [showMenu, setShowMenu] = useState(false);
//     const toggleMenu = () => {
//         setShowMenu(!showMenu);
//     };

//     return (
//         <div className={styles.navbar}>
//             <Link to="/">
//                 <Logo/>
//             </Link>

//             <div className={`${styles.menuIcon} ${showMenu ? styles.active : ''}`} onClick={toggleMenu}>
//                 <div className={styles.bar}></div>
//                 <div className={styles.bar}></div>
//                 <div className={styles.bar}></div>
//             </div>
//             <div className={`${styles.menu} ${showMenu ? styles.show : ''}`}>
//                 <Link to="/">Home</Link>
//                 <Link to="/reservation">Reservation</Link>
//             </div>
//         </div>
//     )
// }

// export default Navbar;