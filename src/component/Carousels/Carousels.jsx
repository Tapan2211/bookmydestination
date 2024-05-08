import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousels.module.css";
import React from "react";

const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
            style={{
                background: "black", // Change background color
                right: "20px",
                height:'20px',
                borderRadius:'50%',
                padding:'10px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}
        />
    );
};

const PrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div
            className={className}
            onClick={onClick}
            style={{
                background: "black", // Change background color
                left: "20px",
                height:'20px',
                borderRadius:'50%',
                padding:'10px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                zIndex: 1, // Ensure it's above the image
            }}
        />
    );
};

const Carousels = ({ images }) => {
    const settings = {
        infinite: true,
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className={styles.sliderContainer}>
            <Slider {...settings} className={styles.sliderContainer}>
                {images.map((item, index) => (
                    <div key={index}>
                        <img src={item} alt={`Image ${index}`} className={styles.image}/>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Carousels;
