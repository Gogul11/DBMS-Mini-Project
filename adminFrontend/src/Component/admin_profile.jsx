import React, { useState } from "react";
import styles from "./profile.module.css"
import { star } from "../img";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function AdminProfile(){
    const navigate=useNavigate()
    const id = localStorage.getItem('adminId')

    const[profile, setProfile] = useState({})

    axios.get(`http://localhost:2000/admin/profile`, {
        headers : {
            Authorization : `Bearer ${localStorage.getItem('adminId')}`
        }
    })
    .then((res) => {
        if(res.data.success){
            setProfile(res.data.profile)
        }
    })

    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub-Admin</p>
                <div>
                    <button className="button" onClick={() => navigate("/admin/home")}>Home</button>
                    <button className="button" onClick={() => navigate(-1)}>Back</button>
                    <button className="button" 
                                            onClick={() => {
                                                navigate("/admin/")
                                                localStorage.removeItem('adminId');
                                            }}>Log Out</button>
                </div>
            </nav>
            <div className={styles.info}>
                    <p className={styles.divi}>Admin's Profile</p>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td>Admin_name</td>
                                <td>:</td>
                                <td>{profile.admin_name}</td>
                            </tr>
                            <tr>
                                <td>Phone no</td>
                                <td>:</td>
                                <td>{profile.phone_number}</td>
                            </tr>
                            <tr>
                                <td>E-mail</td>
                                <td>:</td>
                                <td>{profile.email}</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
            
        </div>
    )
}