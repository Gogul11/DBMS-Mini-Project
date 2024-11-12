import { useState } from "react"
import styles from "./list.module.css"
import { user } from "../img"
import { useNavigate } from "react-router-dom"

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

const Categories = () => {
    return(
        <div>
            <p className={styles.catList}>Categories</p>
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

export default function Category(){

    const[log, setLog] = useState(true)
    const navigate = useNavigate()
    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <input type="text" placeholder="Search by name or category" className="sb"/>
                    <button 
                        className="button"
                        onClick={() => navigate("/")}
                    >HOME</button>
                    <button 
                        className="button"
                        onClick={() => navigate(-1)}
                    >BACK</button>
                    {
                        log ? 
                            <img 
                                src={user} 
                                alt="User Profile" 
                                className="svg"
                                onClick={() => navigate("/profile")}
                            /> :
                            <button 
                                className="button"
                                onClick={() => navigate("/login")}
                            >Login</button>
                    }
                </div>
            </nav>
            <div className={styles.categorylist}>
                <Categories/>
                <Categories/>
                <Categories/>
                <Categories/>
                <Categories/>
                <Categories/>
                <Categories/>
                

            </div>
        </div>
    )
}