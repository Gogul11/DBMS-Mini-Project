import {useState} from "react";
import styles from "./prof.module.css"
import { star } from "../img";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import {PacmanLoader} from "react-spinners"
import { useEffect } from "react";


const Orders = ({name, amount, status, created_at, part_id}) => {
    const navigate =useNavigate();
    return(
        <div className={styles.container}>
            <div>
                <img src="https://placehold.jp/250x250.png" alt="Ordered Part Image" />
            </div>
            <div>
                <p>{name}</p>
                <p>{amount}</p>
                <p>{status}</p>
                <p>{new Date(created_at).toLocaleString()}</p>
                <button onClick={() => navigate(`/user/parts/info/${part_id}`)} 
                    className="button"
                >More Info</button>
            </div>
        </div>
    )
}


export default function Profile(){

    const navigate = useNavigate()

    const[auth, setAuth] = useState(false)
    const[id, setID] = useState(0);

    const[user, setUser] = useState(null)
    const[count, setCount] = useState(0);
    const[orderInfo, setOrderInfo] = useState([])

    useEffect(() => {

        axios.get(`http://localhost:2000/user/profile/`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }})
        .then((res) => {
            if(res.data.success){
                setAuth(true)
                setUser(res.data.user)
                setCount(res.data.orders)
                setOrderInfo(res.data.orderDetails)
            }
        })
        .catch((err) => {
            console.log(err)
        })

        
    })


    return(
        <>
        {auth ? 
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <button 
                        className="button"
                        onClick={() => navigate("/user")}
                    >Home</button>

                    <button 
                        className="button"
                        onClick={() => navigate(-1)}
                    >Back</button>

                    <button 
                        className="button"
                        onClick={() => {
                            localStorage.removeItem('token')
                            navigate("/user")
                        }}
                        >Log out</button>
                </div>
            </nav>
            <div className={styles.info}>
                    <p className={styles.divi}>My Profile</p>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>:</td>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td>Phone Number</td>
                                <td>:</td>
                                <td>{user.phone_number}</td>
                            </tr>
                            <tr>
                                <td>No of Orders</td>
                                <td>:</td>
                                <td>{count}</td>
                            </tr>
                        </tbody>
                    </table>
            </div>

            <div className={styles.orders}>
                <p className={styles.divi}>My Orders</p>
                {orderInfo.map((item) => (
                    <Orders 
                        key={item.order_id}
                        name={item.name} 
                        amount={item.amount} 
                        status={item.status} 
                        created_at={item.created_at}
                        part_id={item.part_id}
                        />
                ))} 
            </div>

        </div>
        :
        <div className="loading">
            <PacmanLoader color="#FC7311" size={50}/>
        </div>
        }</>
    )
}