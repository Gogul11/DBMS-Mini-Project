import { useState } from "react"
import { user } from "../img"
import styles from "./user.module.css"
import { useNavigate } from "react-router-dom";

const Card = () => {
    const navigate=useNavigate()
    return(
        <div className={styles.card}>
            <div>
                <img className={styles.img} src="https://placehold.jp/150x150.png" alt="Profile Picture" />
                <div className={styles.info}>
                    <p>Supplier-ID</p>
                    <p>Name</p>
                    <p>Email-ID</p>
                </div>
            </div>
            <button className="button" onClick={() => navigate("/supplier/profile")}>More Info</button>
    </div>
    )
}

export default function Supplier(){
    const navigate=useNavigate()
    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub-Admin</p>
                <div>
                    <input type="text" placeholder="Search by name or category" className="sb"/>
                    <button className="button" onClick={() => navigate("/home")}>HOME</button>
                    <button className="button" onClick={() => navigate(-1)}>BACK</button>
                    <img src={user} alt="Supplier Profile" className="svg" onClick={() => navigate("/admin_profile")}/> 
                </div>
            </nav>
            <p className={styles.catList}>Supplier</p>
            <div className={styles.cards}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>

            </div>
        </div>
    )
}