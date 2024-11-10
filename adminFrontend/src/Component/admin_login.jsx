import { user } from "../img"
import { useState } from "react"
import React from 'react';
import styles from './admin_login.module.css';

const Admin_login = () => {
    const[log, setLog] = useState(true)
    return (
        <div className={styles.main}>
        <nav className={styles.nav}>
                <p className="title">Spare Hub-Admin</p>
            </nav>
        <div className={styles.body}>
        <h2 className={styles.title}>Admin Login</h2>
        <form className={styles.form}>
            <label>Admin Name</label>
            <input type="text" placeholder="admin name" />
            
            
            <label>Password</label>
            <input type="password" placeholder="Password" />
            
            
            <button type="submit" className={styles.confirmButton}>Confirm</button>
        </form>
        </div>
        </div>
    );
};

export default Admin_login;
