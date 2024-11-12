import { useState } from 'react'
import styles from './home.module.css'
import { supplier, user } from '../img';
import { useNavigate } from 'react-router-dom';


export default function Home(){

    const navigate = useNavigate();
    

    const[log, setLog] = useState(false);
    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                            <img 
                                src={user} 
                                onClick={() => navigate("/supplier-profile")} alt="User Profile" className="svg" /> 
                            <button
                                className="button"
                                onClick={() => navigate("/")}
                            >Log out</button>
                </div>
            </nav>

            <div className={styles.imgDiv}>
                    <img src={supplier} alt="Supplier Image" className={styles.img} />
                    <p className={styles.motto}>Trust, Quality, and Commitment
                            Our Promise to Suppliers.</p>
            </div>

            <div className={styles.butDiv}>
                <button 
                    className={styles.button}
                    onClick={() => {navigate("/products")}}
                >
                    Supplied Products</button>
                <button 
                    className={styles.button}
                    onClick={() => navigate("/add-product")}
                >
                    Add products</button>
                <button 
                    className={styles.button}
                    onClick={() => navigate("/orders")}
                >
                    Orders Taken</button>
            </div>
        </div>
    )
}