import { useEffect, useState } from "react"

import styles from "./part.module.css"
import { star, user } from "../img"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import axios from "axios"
import {PacmanLoader} from "react-spinners"



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

    const[auth, setAuth] = useState(false)
    const[part, setPart] = useState(null)
    const[supp_name, setSupp_name] = useState(null)

    const { id } = useParams()

    axios.get(`http://localhost:2000/user/parts/info/${id}`)
    .then((res) => {
        if(res.data.success){
            setAuth(true)
            setPart(res.data.part[0])
            setSupp_name(res.data.supp)
        }
    })
    .catch((err) => {
        console.log(err)
    })

    

    useEffect(() => {

        axios.get(`http://localhost:2000/user/parts/info/${id}`)
        .then((res) => {
            if(res.data.success){
                setAuth(true)
                setPart(res.data.part[0])
            }
        })
        .catch((err) => {
            console.log(err)
        })
    },[id, auth])
    

    return(
        <>
        {auth ? 
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <input 
                        type="text" 
                        placeholder="Search by name or category" 
                        className="sb"/>
                    {
                        log ? (
                                <img src={user} 
                                    alt="User Profile" 
                                    className="svg"
                                    onClick={() => navigate("/user/profile")}
                                    /> 
                        ):(
                            <button 
                                className="button"
                                onClick={() => navigate("/user/login")}
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
                    <p>{part.part_name}</p>
                    <p>{part.category_name}</p>
                    <div>
                        <p>{part.price * quan}</p>
                        {quan >+ 1 &&
                            <button className = {styles.quanBut} onClick={() => setQuan(quan - 1)}>-</button>
                        }
                        <p>{quan}</p>
                        <button className={styles.quanBut} onClick={() => setQuan(quan + 1)}>+</button>
                    </div>
                    <p>{supp_name}</p>
                    <button className="button">Add To Cart</button>
                </div>
            </div>
            <div className={styles.desc}>
                <p className={styles.Title}>Description : </p>
                <p className={styles.description}>
                        {part.description}
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
        :
        <div className="loading">
            <PacmanLoader color="#FC7311" size={50}/>
        </div>
        }</>
    )
}