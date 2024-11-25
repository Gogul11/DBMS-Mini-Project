import React, { useState } from 'react';
import styles from './order.module.css';
import {user} from "../img"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from "axios"
const OrderPage = () => {
// Example order data; replace with actual data as needed

    const[log, setLog] = useState(false)
    const navigate = useNavigate();
    const[orders, setOrders] = useState([])

    useEffect(() => {
        axios.get("http://localhost:2000/supplier/orders", {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('supToken')}`
            }
        })
        .then((res) => {
            if(res.data.success === 1){
                setOrders(res.data.ordersTaken)
            }
        })
    })

    return (
        <div className={styles.orderPage}>
            <nav className={styles.nav}>
                    <p className="title">Spare Hub</p>
                    <div>
                        <input type="text" placeholder="Search by name or category" className="sb"/>
                                <button 
                                    className="button"
                                    onClick={() => navigate("/supplier/home")}
                                >Home</button>
                                <button 
                                    className="button"
                                    onClick={() => navigate(-1)}
                                >Back</button>
                                <img src={user}
                                    onClick={() => navigate("/supplier/profile")}
                                    alt="User Profile" className="svg" /> 
                    </div>
                </nav>


        <p className={styles.title}>Orders</p>

        <div className={styles.orderList}>
            {orders.map((order, index) => (
            <div className={styles.orderCard} key={index}>
                <div className={styles.orderCardHeader}>
                    <span>BUYER NAME</span>
                    <span>PHONE</span>
                </div>
                <div className={styles.orderCardContent}>
                    <span>{order.username}</span>
                    <span>{order.phone_number}</span>
                </div>
                <div className={styles.orderDetails}>
                    <table>
                        <tbody>
                            <tr className={styles.tr}>
                                <td>Part </td>
                                <td> : </td>
                                <td> {order.name} </td>
                            </tr>
                            <tr className={styles.tr}>
                                <td>Prijce </td>
                                <td> : </td>
                                <td> {order.amount} </td>
                            </tr>
                            <tr className={styles.tr}>
                                <td>Date </td>
                                <td> : </td>
                                <td> {new Date(order.created_at).toISOString().split('T')[0]} </td>
                            </tr>
                            <tr className={styles.tr}>
                                <td>Status </td>
                                <td> : </td>
                                <td> {order.status} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
};

export default OrderPage;
