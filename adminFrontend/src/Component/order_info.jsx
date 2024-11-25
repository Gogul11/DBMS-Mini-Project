import { useEffect, useState } from "react"
import { user } from "../img"
import styles from "./user.module.css"
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import axios from "axios";

const Card = ({userId, orderId, partId, amount}) => {
    const navigate=useNavigate()
    return(
        <div className={styles.card}>
            <div>
                <div className={styles.info}>
                    <p>User Id : {userId}</p>
                    <p>Order Id : {orderId}</p> 
                    <p>Part Id : {partId}</p>
                    <p>Amount : {amount}</p>
                </div>
            </div>
    </div>
    )
}



export default function Order(){
    const navigate=useNavigate()

    const[auth, setAuth] = useState(false)
    const[order, setOrders] = useState([])

    useEffect(() => {
        axios.get("http://localhost:2000/admin/orders")
        .then((res) => {
            if(res.data.success){
                setAuth(res.data.success)
                setOrders(res.data.order)
            }
        })
        .catch(err => {
            setAuth(false)
            console.log(err.message)
        })
    }, [])

    return(
        <>{auth ?  
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub-Admin</p>
                <div>
                    <input type="text" placeholder="Search by name or category" className="sb"/>
                    <button className="button" onClick={() => navigate("/admin/home")}>HOME</button>
                    <button className="button" onClick={() => navigate(-1)}>BACK</button>
                    <img src={user} alt="User Profile" className="svg" onClick={() => navigate("/admin/admin_profile")}/>
                </div>
            </nav>
            <p className={styles.catList}>Orders</p>
            <div className={styles.cards}>
                {order.map((item) => (
                    <Card key={item.order_id}
                            orderId={item.order_id}
                            partId= {item.part_id}
                            userId = {item.user_id}
                            amount = {item.amount}
                        />
                ))}
            </div>
        </div>
        :
            <div className="loading">
                    <PacmanLoader color="#FC7311" size={50} />
            </div>
        }</>
    )
}