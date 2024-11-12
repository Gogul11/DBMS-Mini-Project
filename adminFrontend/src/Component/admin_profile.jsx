import React from "react";
import styles from "./profile.module.css"
import { star } from "../img";

export default function Admin(){

    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub-Admin</p>
                <div>
                    <button className="button">Home</button>
                    <button className="button">Back</button>
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