import React, { useState } from "react";
import styles from "./default.module.css"
import { img, img1, img2, img3, user } from "../img";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import {PacmanLoader} from "react-spinners"

export default function Default(){

    const[log, setLog] = useState(false)
    const[auth, setAuth] = useState(false)

    const navigate = useNavigate();

    axios.get("http://localhost:2000/user")
    .then((res) => {
        if(res.data.success) {
            setAuth(true)
        }
    })
    .catch((err) => {
        setAuth(false)
        console.log(err)
    })

    return(
        <>
        {auth ? 
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <input type="text" placeholder="Search by name or category" className="sb"/>
                    {
                        log ? (
                                <img 
                                    src={user} 
                                    alt="User Profile" 
                                    className="svg" 
                                    onClick={() => navigate("/user/profile")}
                                    />
                        ):(
                            <button 
                                className="button"
                                onClick={() => navigate("/user/login")}
                            >Login</button>
                        )
                    }
                </div>
            </nav>
            <div className={styles.bgimg}>
                <p className={styles.motto}>Efficient Car Parts Management, All in One Place</p>
                <img src={img} alt="Background Image" className={styles.img}/>
            </div>

            <div className={styles.but}>
                <button 
                    className="button"
                    onClick={() => navigate("/user/parts")}
                >View Parts</button>
            </div>
            
            <div className={styles.info}>
                <div className={styles.info1}>
                    <p>100+ <br />Trusted <br />Suppliers</p>
                    <img src={img1} alt="suppliers image" className={styles.img2}/>
                </div>
                <div className={styles.info2}>
                    <p>500+ <br />Spare parts <br /> Categories</p>
                    <img src={img2} alt="Parts image" className={styles.img2}/>
                </div>
                <div className={styles.info3}>
                    <p>1000+ <br /> Users</p>
                    <img src={img3} alt="Users image" className={styles.img2}/>
                </div>
            </div>
        </div>
        :
        <div className="loading">
            <PacmanLoader color="#FC7311" size={50}/>
        </div>
        }
        </>
    )
}