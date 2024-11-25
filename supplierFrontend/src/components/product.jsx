// SupplierPage.js
import React, { useEffect, useState } from 'react';
import styles from './product.module.css';
import {user} from '../img'
import { useNavigate } from 'react-router-dom';

import axios from "axios"
import {PacmanLoader} from "react-spinners"

const SupplierPage = () => {

    const[auth, setAuth] = useState(false)
    const[products, setProducts] = useState([])
    const[message, setMessage] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {

        axios.get("http://localhost:2000/supplier/products", {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('supToken')}`
            }
        })
        .then((res) => {
            if(res.data.success === 1){
                setAuth(true)
                setProducts(res.data.suppliedParts)
            }
            else if(res.data.success === 2){
                setAuth(true)
                setMessage(res.data.message)
            }
        })
        .catch(err => {
            console.log(err.message)
        })

    }, [])

return (
    <>{auth ? 
    <div className={styles.supplierPage}>

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

    <button 
        className="button"
        onClick={() => navigate("/supplier/add-product")}
        >Add Product</button>
    {message ?  (
        <span>{message}</span>
    ):
    <div className={styles.productList}>
        {products.map((product, index) => (
        <div className={styles.productCard} key={index}>
            <div className={styles.productCardHeader}>
                <span>NAME</span>
                <span>CATEGORY</span>
                <span>PRICE</span>
                <span>ORDERS</span>
            </div>
            <div className={styles.productCardContent}>
                <span>{product.name}</span>
                <span>{product.category_name}</span>
                <span>{product.price}</span>
                <span>{product.orders}</span>
            </div>
            <div className={styles.productCardDescription}>
                    {product.description}
            </div>
        </div>
        ))}
    </div>
    }
    </div>
    :
    <div className="loading">
        <PacmanLoader color="#FC7311" size={50}/>
    </div>
    }</>
);
};

export default SupplierPage;
