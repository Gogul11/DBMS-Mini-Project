import React from "react";
import styles from "./profile.module.css"
import { star } from "../img";

const Orders = () => {
    return(
        <div className={styles.container}>
            <div>
                <img src="https://placehold.jp/250x250.png" alt="Ordered Part Image" />
            </div>
            <div>
                <p>name</p>
                <p>Part ID</p>
                <p>Price</p>
                <button className="button">More Info</button>
            </div>
        </div>
    )
}


export default function Supplier(){

    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <button className="button">Home</button>
                    <button className="button">Back</button>
                </div>
            </nav>
            <div className={styles.info}>
                    <p className={styles.divi}>Supplier's Profile</p>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>:</td>
                                <td>Name</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>Email</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>:</td>
                                <td>0000000000</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
            <div className={styles.orders}>
                <p className={styles.divi}>Supplier's product</p>
                <Orders/>
                <button className="button">View More</button>
            </div>
        </div>
    )
}