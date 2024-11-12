import { useState } from "react"
import { user } from "../img"
import styles from "./list.module.css"
import { Link, useNavigate } from "react-router-dom"

const Card = () => {
    const navigate = useNavigate()
    return(
        <div className={styles.card}>
            <div>
                <img className={styles.img} src="https://placehold.jp/150x150.png" alt="Profile Picture" />
                <div className={styles.info}>
                    <p>Name</p>
                    <p>Category</p>
                    <p>Price</p>
                </div>
            </div>
            <button 
                className="button"
                onClick={() => navigate("/parts/info")}
            >More Info</button>
    </div>
    )
}

export default function List(){

    const navigate = useNavigate()

    const[log, setLog] = useState(true)
    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <input type="text" placeholder="Search by name or category" className="sb"/>
                    {
                        log ? (
                                <img src={user} 
                                    alt="User Profile" 
                                    className="svg" 
                                    onClick={() => navigate("/profile")}
                                    /> 
                        ):(
                            <button 
                                className="button"
                                onClick={() => navigate("/login")}
                            >Login</button>
                        )
                    }
                </div>
            </nav>
            <button 
                className="button"
                onClick={() => navigate("/category")}
            >Categories</button>
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
