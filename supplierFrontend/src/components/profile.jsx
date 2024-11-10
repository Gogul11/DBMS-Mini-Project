import styles from './profile.module.css'

export default function(){

    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <button className="button">Home</button>
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