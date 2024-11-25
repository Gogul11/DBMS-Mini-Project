import { useState } from "react"

import styles from "./part.module.css"
import { star, user } from "../img"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"
import {PacmanLoader} from "react-spinners"
import axios from "axios"

export default function BuyNow(){

    const[log, setLog] = useState(true)
    const[quan, setQuan] = useState(1)
    const navigate = useNavigate()
    const[auth, setAuth] = useState(false)
    const[message, setMessage] = useState(null)

    const[part, setPart] = useState(null)
    const[supp_name, setSupp_name] = useState(null)


    const { id } = useParams()


    useEffect(() => {
        const token = localStorage.getItem('token');
        setLog(token); 
        console.log(id)

        axios.get(`http://localhost:2000/user/buy/${id}`)
        .then((res) => {
            if(res.data.success){
                setAuth(res.data.success)
                setPart(res.data.part[0])
                setSupp_name(res.data.supp)
            }
        }).catch(err => {
            setAuth(false)
            console.log(err.message)
        })

    }, [])

    const confirmOrder = async() => {
        await axios.post('http://localhost:2000/user/buy', {
            part_id : part.part_id,
            price : part.price * quan,
            status : "Pending"
        },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
        }})
        .then((res) => {
            if(res.data.success){
                setMessage(res.data.message)
            }
        })
    }

    return(
        <>{auth ? 
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <input type="text" placeholder="Search by name or category" className="sb"/>
                    <button 
                        className="button"
                        onClick={() => navigate('/user')}
                    >Home</button>
                    <button 
                        className="button"
                        onClick={() => navigate(-1)}
                    >Back</button>
                    {
                        log ? 
                            <img src={user} 
                            alt="User Profile" 
                            className="svg"
                            onClick={() => navigate("/user/profile")}
                            />  :
                            <button className="button">Login</button>
                    }
                </div>
            </nav>
            {message && (
                <span>{message}</span>
            )}
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
                </div>
            </div>
            <div className={styles.confirm}>
                <button 
                    className={styles.confirmOrder}
                    onClick={confirmOrder}
                >Confirm Order</button>
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