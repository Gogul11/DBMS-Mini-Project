import { useState } from "react"

import styles from "./part.module.css"
import { star, user } from "../img"
import { Link, useNavigate } from "react-router-dom"


const Review = () => {

    return(
        <div className={styles.reviewPart}>
            <div>
                <p>User name</p>
                <div>
                    <p>Date</p>
                    <img src={star} alt="Ratings" className={styles.star}/>
                    <img src={star} alt="Ratings" className={styles.star}/>
                    <img src={star} alt="Ratings" className={styles.star}/>
                    <img src={star} alt="Ratings" className={styles.star}/>
                    <img src={star} alt="Ratings" className={styles.star}/>
                </div>
            </div>
            <p className={styles.comm}>Comments : </p>
                <div className={styles.reviewText}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, a hic nulla blanditiis, similique iste expedita tempora commodi reiciendis dolor ea nesciunt consequatur molestias numquam repudiandae minima tempore. Quos, itaque!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos deleniti minus asperiores architecto, aliquid corporis ipsam delectus voluptates quod, eius sit ducimus cupiditate incidunt voluptas ullam id nostrum odio soluta.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos deleniti minus asperiores architecto, aliquid corporis ipsam delectus voluptates quod, eius sit ducimus cupiditate incidunt voluptas ullam id nostrum odio soluta.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos deleniti minus asperiores architecto, aliquid corporis ipsam delectus voluptates quod, eius sit ducimus cupiditate incidunt voluptas ullam id nostrum odio soluta.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos deleniti minus asperiores architecto, aliquid corporis ipsam delectus voluptates quod, eius sit ducimus cupiditate incidunt voluptas ullam id nostrum odio soluta.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos deleniti minus asperiores architecto, aliquid corporis ipsam delectus voluptates quod, eius sit ducimus cupiditate incidunt voluptas ullam id nostrum odio soluta.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos deleniti minus asperiores architecto, aliquid corporis ipsam delectus voluptates quod, eius sit ducimus cupiditate incidunt voluptas ullam id nostrum odio soluta.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos deleniti minus asperiores architecto, aliquid corporis ipsam delectus voluptates quod, eius sit ducimus cupiditate incidunt voluptas ullam id nostrum odio soluta.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos deleniti minus asperiores architecto, aliquid corporis ipsam delectus voluptates quod, eius sit ducimus cupiditate incidunt voluptas ullam id nostrum odio soluta.

                </div>
        </div>
    )
}

export default function Part(){

    const[log, setLog] = useState(true)
    const[quan, setQuan] = useState(1)

    const navigate = useNavigate()

    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <input type="text" placeholder="Search by name or category" className="sb"/>
                    {
                        log ? (
                                <img src={user} 
                                    alt="User Profile" 
                                    className="svg"
                                    onClick={() => navigate("/profile")}
                                    /> 
                        ):(
                            <button 
                                className="button"
                                onClick={() => navigate("/login")}
                            >Login</button>
                        )
                    }
                    <button 
                        className="button"
                        onClick={() => navigate(-1)}
                            >Back</button>
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
                    <button className="button">Add To Cart</button>
                </div>
            </div>
            <div className={styles.desc}>
                <p className={styles.Title}>Description : </p>
                <p className={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias maxime voluptate labore officiis natus exercitationem. Laboriosam necessitatibus sapiente iure optio ratione quos obcaecati, unde ipsum, quas cum, perferendis voluptatum!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias maxime voluptate labore officiis natus exercitationem. Laboriosam necessitatibus sapiente iure optio ratione quos obcaecati, unde ipsum, quas cum, perferendis voluptatum!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias maxime voluptate labore officiis natus exercitationem. Laboriosam necessitatibus sapiente iure optio ratione quos obcaecati, unde ipsum, quas cum, perferendis voluptatum!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias maxime voluptate labore officiis natus exercitationem. Laboriosam necessitatibus sapiente iure optio ratione quos obcaecati, unde ipsum, quas cum, perferendis voluptatum!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias maxime voluptate labore officiis natus exercitationem. Laboriosam necessitatibus sapiente iure optio ratione quos obcaecati, unde ipsum, quas cum, perferendis voluptatum!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias maxime voluptate labore officiis natus exercitationem. Laboriosam necessitatibus sapiente iure optio ratione quos obcaecati, unde ipsum, quas cum, perferendis voluptatum!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias maxime voluptate labore officiis natus exercitationem. Laboriosam necessitatibus sapiente iure optio ratione quos obcaecati, unde ipsum, quas cum, perferendis voluptatum!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias maxime voluptate labore officiis natus exercitationem. Laboriosam necessitatibus sapiente iure optio ratione quos obcaecati, unde ipsum, quas cum, perferendis voluptatum!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias maxime voluptate labore officiis natus exercitationem. Laboriosam necessitatibus sapiente iure optio ratione quos obcaecati, unde ipsum, quas cum, perferendis voluptatum!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias maxime voluptate labore officiis natus exercitationem. Laboriosam necessitatibus sapiente iure optio ratione quos obcaecati, unde ipsum, quas cum, perferendis voluptatum!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias maxime voluptate labore officiis natus exercitationem. Laboriosam necessitatibus sapiente iure optio ratione quos obcaecati, unde ipsum, quas cum, perferendis voluptatum!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente alias maxime voluptate labore officiis natus exercitationem. Laboriosam necessitatibus sapiente iure optio ratione quos obcaecati, unde ipsum, quas cum, perferendis voluptatum!
                </p>
            </div>
                <p className={styles.Title}>Reviews</p>
            <div className={styles.reviews}>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                <Review/>
                <Review/>

            </div>
        </div>
    )
}