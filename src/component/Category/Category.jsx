import React, { useEffect, useState } from "react";
import styles from './category.module.css';

function Category() {

    return (
        <div>
            <div className={styles.main_div}>
                <p>
                    Explore all adventures<br />
                    Here's a list of places that you can explore in city
                </p>
               
            </div>
        </div>
    )
}

export default Category;