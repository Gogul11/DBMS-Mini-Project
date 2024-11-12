import { user } from "../img"
import { useState } from "react"
import React from 'react';
import styles from './admin_supplier.module.css';
import { useNavigate } from "react-router-dom";

const Admin_supplier = () => {
    const[log, setLog] = useState(true)
    const navigate=useNavigate()
    return (
        <div className={styles.main}>
        <nav className={styles.nav}>
                <p className="title">Spare Hub-Admin</p>
                <div>
                    
                    <button className="button">BACK</button>
                    {
                        log ? 
                            <img src={user} alt="User Profile" className="svg" /> :
                            <button className="button">Login</button>
                    }
                </div>
            </nav>
        <div className={styles.body}>
        <h2 className={styles.title}>Supplier Details</h2>
        <form className={styles.form}>
            <label>Supplier Name</label>
            <input type="text" placeholder="Supplier name" />
            
            <label>Supplier Email</label>
            <input type="email" placeholder="abc@gmail.com" />
            
            <label>Supplier Phone</label>
            <input type="text" placeholder="phone" />
            
            <label>Supplier Address</label>
            <input type="text" placeholder="Address" />
            
            <label>Password</label>
            <input type="password" placeholder="Password" />
            
            <label>Confirm Password</label>
            <input type="password" placeholder="Password" />
            
            <button type="submit" className={styles.confirmButton}>Confirm</button>
        </form>
        </div>
        </div>
    );
};

export default Admin_supplier;