import { user } from "../img"
import { useState } from "react"
import React from 'react';
import styles from './admin_home.module.css';
import { useNavigate } from "react-router-dom";
const Admin_home = () => {
    const navigate=useNavigate()
    return (
    <div className={styles.main}>
        <nav className={styles.nav}>
            <p className="title">Spare Hub-Admin</p>
            <div>
                <input type="text" placeholder="Search by name or category" className="sb"/>
                
                        <img 
                            src={user} alt="User Profile" className="svg" 
                           /> 
            </div>
        </nav>
        <div className={styles.grid}>
            <div className={styles.grid1}> 
                <div 
                    className={styles.card}
                    onClick={() => navigate("/supplier")}
                >Supplier Details</div>
                <div 
                    className={styles.card}
                    onClick={() => navigate("/user")}
                >User Details</div>
            </div>
            <div className={styles.grid2}> 
                <div 
                    className={styles.card}
                    onClick={() => navigate("/order")}
                >Order Details</div>
                <div 
                    className={styles.card}
                    onClick={() => navigate("/parts")}
                >Part Info</div>
            </div>
        </div>
    </div>
  );
};

export default Admin_home;