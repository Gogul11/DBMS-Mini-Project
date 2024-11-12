import { useNavigate } from 'react-router-dom'
import styles from './login.module.css'

export default function Login(){

        const navigate = useNavigate();
        return (
            <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
            </nav>
            <div>
                <form className={styles.form}>
                <label htmlFor='username'  className={styles.label}>Username or Email</label>
                <input type="text" name='username' id='username' placeholder="abc@gmail.com" className={styles.input}/>

                <label htmlFor='password'  className={styles.label}>Password</label>
                <input type="text" name='password' id='password' placeholder="password" className={styles.input}/>
                <button 
                    className='button'
                    onClick={() => navigate("/home")}
                >Login</button>
                </form>


            </div>
        </div>

        )
}



