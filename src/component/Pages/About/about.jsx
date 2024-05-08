import React, { useState } from "react";
import { Box, Stack, TextField, Button, CircularProgress } from "@mui/material";
import styles from './about.module.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from 'validator';


import Navbar from "../../Navbar/Navbar";
import { createUse } from '../../Api/Api';

function About() {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        age: '',
        address: '',
        image: null
    });

    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    const validation = (data) => {
        if (data.firstname === '') {
            toast.warn('Firstname is a required field');
            return false;
        } else if (data.lastname === '') {
            toast.warn('Lastname is a required field');
            return false;
        } else if (data.email === '') {
            toast.warn('Email is a required field');
            return false;
        } else if (!validator.isEmail(data.email)) {
            toast.warn('Please enter a valid email address');
            return false;
        } else if (data.age === '' || !validator.isNumeric(data.age) || Number(data.age) <= 0) {
            toast.warn('Age must be a valid number');
            return false;
        } else if (data.address === '') {
            toast.warn('Address is a required field');
            return false;
        } else {
            return true;
        }
    };

    const handleForm = async () => {
        if (!validation(formData)) {
            return false;
        }
        setIsLoading(true);

        console.log("formData", formData);

        const formSendData = new FormData();
        formSendData.append('firstname', formData.firstname);
        formSendData.append('lastname', formData.lastname);
        formSendData.append('email', formData.email);
        formSendData.append('age', formData.age);
        formSendData.append('address', formData.address);
        formSendData.append('image', formData.image);

        console.log("FORMDATA", formSendData);

        try {
            const response = await createUse(formSendData);
            setIsLoading(false);
            if (response && response.data && response.data.firstname) {
                toast.success(response.message);
                setFormData({
                    firstname: '',
                    lastname: '',
                    email: '',
                    age: '',
                    address: '',
                    image: null,
                });
            } else {
                toast.error('Failed to create user');
            }
        } catch (error) {
            setIsLoading(false);
            toast.error("Error: " + error.message || "An error occurred");
        }
    };


    return (
        <div>
            <Navbar />
            <div className={styles.main_div}>

                <Box className={styles.input}>
                    <Stack spacing={2}>

                        <TextField
                            id="username"
                            label="Firstname"
                            variant="outlined"
                            title="Name"
                            name="Name"
                            fullWidth
                            value={formData.firstname}
                            onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                        />

                        <TextField
                            id="username"
                            label="Lastname"
                            variant="outlined"
                            title="Name"
                            name="Name"
                            fullWidth
                            value={formData.lastname}
                            onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                        />

                        <TextField
                            id="username"
                            label="Email"
                            variant="outlined"
                            title="Name"
                            name="Name"
                            fullWidth
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />

                        <TextField
                            id="username"
                            label="Age"
                            variant="outlined"
                            title="Name"
                            name="Name"
                            fullWidth
                            type="number"
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />

                        <TextField
                            id="outlined-multiline-static"
                            label="Address"
                            multiline
                            rows={4}
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />

                        <div className={styles.line}></div>

                        <div className={styles.main_div1}>

                            <div className={styles.left_div}>
                                {/* <p >Person's</p>
                                <p>₹100</p> */}
                                <input type="file" accept="image/*" onChange={handleImageChange} />
                            </div>

                            <div className={styles.right_div}>
                                {/* <TextField
                                    id="outlined-basic"
                                    label="Count"
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                    className={styles.input}
                                /> */}

                                {formData.image && (
                                    <div>
                                        <img src={URL.createObjectURL(formData.image)} alt="Selected" style={{ width: '100px', height: '80px', margin: '5px', borderRadius: '5px' }} />
                                    </div>
                                )}

                                {/* {formData.image && (
                                    <div>
                                        <img src={formData.image} alt="Selected" style={{ width: '100px', height: '80px', margin: '5px', borderRadius: '5px' }} />
                                    </div>
                                )} */}
                            </div>
                        </div>

                        <div className={styles.line}></div>
                        {
                            isLoading ? (
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="100%"
                                >
                                    <CircularProgress size={20} style={{ color: "orange" }} />
                                </Box>
                            ) : (
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: 'orange' }}
                                    onClick={handleForm}>CREATE</Button>

                            )

                        }

                    </Stack>
                </Box>

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
    )
}

export default About;
