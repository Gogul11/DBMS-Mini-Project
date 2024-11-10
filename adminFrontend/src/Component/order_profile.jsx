import React from "react";
import styles from "./profile.module.css"
import { star } from "../img";

export default function Order(){

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
                    <p className={styles.divi}>Order's Profile</p>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td>Order_id</td>
                                <td>:</td>
                                <td>Order_id</td>
                            </tr>
                            <tr>
                                <td>User_name</td>
                                <td>:</td>
                                <td>User_name</td>
                            </tr>
                            <tr>
                                <td>Order_name</td>
                                <td>:</td>
                                <td>Order_name</td>
                            </tr>
                            <tr>
                                <td>Part_name</td>
                                <td>:</td>
                                <td>Part_name</td>
                            </tr>
                            <tr>
                                <td>Amount</td>
                                <td>:</td>
                                <td>Amount</td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td>:</td>
                                <td>Status</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
            
        </div>
    )
}