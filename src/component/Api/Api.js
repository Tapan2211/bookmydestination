import axios from 'axios';

export const BASEURL = "https://qtrip-dynamic-gvnq.onrender.com"
export const BASE_URL = "http://localhost:8081"

export const fetchCities = async () => {
    try {
        const response = await axios(`${BASEURL}/cities`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const fetchPlaceByCity = async (id) => {
    try {
        const response = await axios(`${BASEURL}/adventures?city=${id}`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const fetchAdventureDetail = async (id) => {
    try {
        const response = await axios(`${BASEURL}/adventures/detail/?adventure=${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const reservationDate = async (reservationObj) => {
    console.log("OBJECT", reservationObj)
    try {
        const response = await axios.post(`${BASEURL}/reservations/new`, reservationObj);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const fetchReservationList = async () => {
    try {
        const response = await axios.get(`${BASEURL}/reservations`);
        return response.data; // Corrected from reservationDate.data
    } catch (error) {
        console.log(error);
    }
}

export const fatchuserList = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/user`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const createUse = async (formData) =>{
    try {
        // const response = await axios.post(`${BASE_URL}/user/new`, {
        //     ...formData
        // });
        console.log("PERAMETER", formData);
        const response = await axios.post(`${BASE_URL}/user/new`, formData);
        console.log("RESPONE", response);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}