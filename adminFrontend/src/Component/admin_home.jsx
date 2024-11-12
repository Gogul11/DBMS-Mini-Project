import { user } from "../img"
import { useState } from "react"
import React from 'react';
import styles from './admin_home.module.css';

const Admin_home = () => {
    const[log, setLog] = useState(true)
    return (
    <div className={styles.main}>
        <nav className={styles.nav}>
            <p className="title">Spare Hub-Admin</p>
            <div>
                <input type="text" placeholder="Search by name or category" className="sb"/>
                {
                    log ? 
                        <img src={user} alt="User Profile" className="svg" /> :
                        <button className="button">Login</button>
                }
            </div>
        </nav>
        <div className={styles.grid}>
            <div className={styles.grid1}> 
                <div className={styles.card}>Supplier Details</div>
                <div className={styles.card}>User Details</div>
                <div className={styles.card}>Order Details</div>
            </div>
            <div className={styles.grid2}> 

                <div className={styles.card}>Part Info</div>
                <div className={styles.card}>Reviews</div>
            </div>
        </div>
    </div>
  );
};

export default Admin_home;