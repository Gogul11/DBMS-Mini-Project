import { useState } from "react"

import styles from "./part.module.css"
import { star, user } from "../img"

export default function BuyNow(){

    const[log, setLog] = useState(true)
    const[quan, setQuan] = useState(1)

    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <input type="text" placeholder="Search by name or category" className="sb"/>
                    <button className="button">Home</button>
                    <button className="button">Back</button>
                    {
                        log ? 
                            <img src={user} alt="User Profile" className="svg" /> :
                            <button className="button">Login</button>
                    }
                </div>
            </nav>
            <div className={styles.partInfo}>
                <div>
                    <img src="https://placehold.jp/300x300.png" alt="" />
                </div>
                <div>
                    <p>Name</p>
                    <p>Catogery Name</p>
                    <div>
                        <p>{500 * quan}</p>
                        {quan >+ 1 &&
                            <button className = {styles.quanBut} onClick={() => setQuan(quan - 1)}>-</button>
                        }
                        <p>{quan}</p>
                        <button className={styles.quanBut} onClick={() => setQuan(quan + 1)}>+</button>
                    </div>
                    <p>Supplier Name</p>
                </div>
            </div>
            <div className={styles.confirm}>
                <button className={styles.confirmOrder}>Confirm Order</button>
            </div>
        </div>
    )
}