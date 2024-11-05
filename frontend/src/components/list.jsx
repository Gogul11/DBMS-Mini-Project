import { useState } from "react"
import { user } from "../img"
import styles from "./list.module.css"

const Card = () => {

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
            <button className="button">More Info</button>
    </div>
    )
}

export default function List(){

    const[log, setLog] = useState(true)
    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <input type="text" placeholder="Search by name or category" className="sb"/>
                    <button className="button">HOME</button>
                    <button className="button">BACK</button>
                    {
                        log ? 
                            <img src={user} alt="User Profile" className="svg" /> :
                            <button className="button">Login</button>
                    }
                </div>
            </nav>
            <button className="button">Categories</button>
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
