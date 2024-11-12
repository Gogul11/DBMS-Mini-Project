import { Link, useNavigate } from "react-router-dom"
import styles from "./register.module.css"
import {z} from "zod"

export default function Register(){

    const navigate = useNavigate();
    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <input type="text" placeholder="Search by name or category" className="sb"/>
                </div>
                <button 
                    className="button"
                    onClick={() => navigate("/")}
                >Home</button>
            </nav>
            <div>
                    <form className={styles.form}>
                        <label htmlFor="username" className={styles.lable}>User Name :</label>
                        <input type="text" name="username" id="username" className={styles.input}/>
                        
                        <label htmlFor="email" className={styles.lable}>Email :</label>
                        <input type="text" name="email" id="email" className={styles.input}/>
                        
                        <label htmlFor="password" className={styles.lable}>password :</label>
                        <input type="text" name="password" id="password" className={styles.input}/>
                        
                        <label htmlFor="cPassword" className={styles.lable}>Confirm Password :</label>
                        <input type="text" name="cPassword" id="cPassword" className={styles.input}/>

                        <button 
                            className="button"
                            onClick={() => navigate("/login")}
                        >Register</button>
                    </form>
            </div>
        </div>
    )
}