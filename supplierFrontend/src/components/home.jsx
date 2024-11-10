import { useState } from 'react'
import styles from './home.module.css'
import { supplier, user } from '../img';

export default function Home(){

    const[log, setLog] = useState(false);
    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                            <img src={user} alt="User Profile" className="svg" /> 
                </div>
            </nav>

            <div className={styles.imgDiv}>
                    <img src={supplier} alt="Supplier Image" className={styles.img} />
                    <p className={styles.motto}>Trust, Quality, and Commitment
                            Our Promise to Suppliers.</p>
            </div>

            <div className={styles.butDiv}>
                <button className={styles.button}>Supplied Products</button>
                <button className={styles.button}>Add products</button>
                <button className={styles.button}>Orders Taken</button>
            </div>
        </div>
    )
}