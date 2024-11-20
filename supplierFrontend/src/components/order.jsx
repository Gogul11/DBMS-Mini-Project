import React, { useState } from 'react';
import styles from './order.module.css';
import {user} from "../img"
import { useNavigate } from 'react-router-dom';

const OrderPage = () => {
// Example order data; replace with actual data as needed
const orders = [
    { buyerName: 'John Doe', partName: 'Part A', price: '$100', quantity: 5, phone: '123-456-7890', date: '2023-01-01', status: 'Shipped' },
    { buyerName: 'Jane Smith', partName: 'Part B', price: '$200', quantity: 2, phone: '234-567-8901', date: '2023-01-02', status: 'Pending' },
    { buyerName: 'Sam Wilson', partName: 'Part C', price: '$150', quantity: 1, phone: '345-678-9012', date: '2023-01-03', status: 'Delivered' },
];

const[log, setLog] = useState(false)
const navigate = useNavigate();
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
                <span>QUANTITY</span>
                <span>PHONE</span>
            </div>
            <div className={styles.orderCardContent}>
                <span>{order.buyerName}</span>
                <span>{order.quantity}</span>
                <span>{order.phone}</span>
            </div>
            <div className={styles.orderDetails}>
                <table>
                    <tbody>
                        <tr className={styles.tr}>
                            <td>Part </td>
                            <td> : </td>
                            <td> {order.partName} </td>
                        </tr>
                        <tr className={styles.tr}>
                            <td>Prijce </td>
                            <td> : </td>
                            <td> {order.price} </td>
                        </tr>
                        <tr className={styles.tr}>
                            <td>Date </td>
                            <td> : </td>
                            <td> {order.date} </td>
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
