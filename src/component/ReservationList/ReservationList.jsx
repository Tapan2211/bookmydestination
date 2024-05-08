// ReservationList.js
import React from "react";
import styles from "./ReservationList.module.css";
import {useNavigate} from 'react-router-dom';

function ReservationList({ data }) {
    const navigate = useNavigate();
    // Check if data is an array before using map

    if (!Array.isArray(data) || data.length === 0) {
        return <p>No reservations found</p>;
    }

    const handleAdvanetur = (id, name) => {
        console.log(id);
        console.log(name);
        navigate(`/details/${id}`)
    }

    return (
        <div className={styles.main_div}>
            <h2>Your Reservations</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>Booking Name</th>
                        <th>Adventure</th>
                        <th>Person(s)</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Booking Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((reservation) => (
                        <tr key={reservation.id}>
                            <td>{reservation.id}</td>
                            <td>{reservation.name}</td>
                            <td>{reservation.adventureName}</td>
                            <td>{reservation.person}</td>
                            <td>{reservation.date}</td>
                            <td>₹{reservation.price}</td>
                            <td>{reservation.time}</td>
                            <td><span className={styles.action} onClick={()=>handleAdvanetur(reservation.adventure, reservation.adventureName)}>Visit Advanture</span></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReservationList;
