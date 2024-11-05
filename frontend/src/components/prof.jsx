import React from "react";
import styles from "./prof.module.css"
import { star } from "../img";

const Orders = () => {
    return(
        <div className={styles.container}>
            <div>
                <img src="https://placehold.jp/250x250.png" alt="Ordered Part Image" />
            </div>
            <div>
                <p>Ordered Part Name</p>
                <p>Amount</p>
                <p>Date</p>
                <p>Status</p>
                <p>Quantity</p>
                <button className="button">More Info</button>
            </div>
        </div>
    )
}

const Reviews = () => {

    return(
        <div className={styles.reviewBox}>
            <div className={styles.head}>
                <p>Part Name</p>
                <p>Date</p>
                <div>
                    <img src={star} alt="Ratings" className={styles.star} />
                    <img src={star} alt="Ratings" className={styles.star} />
                    <img src={star} alt="Ratings" className={styles.star} />
                    <img src={star} alt="Ratings" className={styles.star} />
                    <img src={star} alt="Ratings" className={styles.star} />
                </div>
                <button className="button">More Info</button>
            </div>
            <div>
                <p className={styles.sub}>comment : </p>
                
                <p className={styles.comments}> 
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus enim optio, sint corporis quaerat doloribus repudiandae. Nihil esse iure corrupti dolor? Veritatis quibusdam consectetur, reprehenderit ut maiores fuga laudantium recusandae.
                </p>
            </div>
        </div>
    )
}
export default function Profile(){

    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <button className="button">Home</button>
                    <button className="button">Back</button>
                </div>
            </nav>
            <div className={styles.info}>
                    <p className={styles.divi}>My Profile</p>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>:</td>
                                <td>Name</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>Email</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>:</td>
                                <td>0000000000</td>
                            </tr>
                            <tr>
                                <td>No of Orders</td>
                                <td>:</td>
                                <td>1000</td>
                            </tr>
                        </tbody>
                    </table>
            </div>
            <div className={styles.orders}>
                <p className={styles.divi}>My Orders</p>
                <Orders/>
                <button className="button">View More</button>
            </div>
            <div className={styles.reviews}>
                <p className={styles.divi}>My Reviews</p>
                <Reviews/>
                <button className="button">View More</button>

            </div>
        </div>
    )
}