import { useNavigate } from 'react-router-dom'
import styles from './profile.module.css'
import axios from "axios"
import {PacmanLoader} from "react-spinners"
import { useEffect, useState } from 'react'
import { set } from 'zod'

export default function(){

    const navigate = useNavigate()
    const [auth, setAuth] = useState(false)
    const[profile, setProfile] = useState(null)

    useEffect(() => {
        axios.get("http://localhost:2000/supplier/profile")
        .then((res) => {
            if(res.data.success){
                setAuth(true)
                setProfile(res.data.profile)
            }
        })
        .catch((err) => {
            setAuth(false)
            console.log(err.message)
        })
    }, [])

    return(
        <>{auth ? 
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <button 
                        className="button"
                        onClick={() => navigate("/supplier/home")}
                    >Home</button>
                    <button 
                                className="button"
                                onClick={() => navigate(-1)}
                            >Back</button>
                </div>
            </nav>

            <div className={styles.info}>
                <p>My profile</p>
                <p>Name : {profile.supplier_name}</p>
                <p>Email : {profile.email}</p>
                <p>Phone Number : {profile.phone_number}</p>
                <p>Address : <br />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; {profile.address}</p>
                <p>Total no of Products Supplied :</p>
                <p>Ratings : </p>
                <p></p>
            </div>
        </div>
        :
        <div className="loading">
            <PacmanLoader color="#FC7311" size={50}/>
        </div>
        }
        </>
    )
}