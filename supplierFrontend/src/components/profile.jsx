import { useNavigate } from 'react-router-dom'
import styles from './profile.module.css'

export default function(){

    const navigate = useNavigate()

    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <button 
                        className="button"
                        onClick={() => navigate("/home")}
                    >Home</button>
                    <button 
                                className="button"
                                onClick={() => navigate(-1)}
                            >Back</button>
                </div>
            </nav>

            <div className={styles.info}>
                <p>My profile</p>
                <p>Name</p>
                <p>Email</p>
                <p>Phone Number</p>
                <p>Address</p>
                <p>Total no of Products Supplied :</p>
                <p>Ratings : </p>
                <p></p>
            </div>
        </div>
    )
}