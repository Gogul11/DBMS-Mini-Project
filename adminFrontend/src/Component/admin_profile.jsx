import React from "react";
import styles from "./profile.module.css"
import { star } from "../img";
import { useNavigate } from "react-router-dom";

export default function AdminProfile(){
    const navigate=useNavigate()

    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub-Admin</p>
                <div>
                    <button className="button" onClick={() => navigate("/home")}>Home</button>
                    <button className="button" onClick={() => navigate(-1)}>Back</button>
                    <button className="button" onClick={() => navigate("/")}>Log Out</button>
                </div>
            </nav>
            <div className={styles.info}>
                    <p className={styles.divi}>Admin's Profile</p>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td>Admin_name</td>
                                <td>:</td>
                                <td>Admin_name</td>
                            </tr>
                            <tr>
                                <td>Phone no</td>
                                <td>:</td>
                                <td>Phone no</td>
                            </tr>
                            <tr>
                                <td>E-mail</td>
                                <td>:</td>
                                <td>E-mail</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
            
        </div>
    )
}