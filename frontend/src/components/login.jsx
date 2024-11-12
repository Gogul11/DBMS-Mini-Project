import { Link, useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import {z} from "zod"

export default function Login(){

        const navigate = useNavigate();
        return (
            <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <input type="text" placeholder="Search by name or category" className="sb"/>
                </div>
                <button
                    onClick={() => navigate("/")}
                    className='button'
                    >Home</button>
            </nav>
            <div>
                <form className={styles.form}>
                <label htmlFor='username'  className={styles.label}>Username or Email</label>
                <input type="text" name='username' id='username' placeholder="abc@gmail.com" className={styles.input}/>
                <label htmlFor='password'  className={styles.label}>Password</label>
                <input type="text" name='password' id='password' placeholder="password" className={styles.input}/>
                <button 
                    onClick={() => navigate("/")}
                    className='button'>Login</button>
                <p className='new'>Are you new ? <Link to="/register" className={styles.a}>Sign Up</Link></p>
                </form>
            </div>
        </div>
        )
}



