// SupplierPage.js
import React, { useState } from 'react';
import styles from './product.module.css';
import {user} from '../img'
import { useNavigate } from 'react-router-dom';

const SupplierPage = () => {
const products = [
    { name: 'Product A', category: 'Category 1', price: '$100', orders: '50', description: 'Description of Product A' },
    { name: 'Product B', category: 'Category 2', price: '$200', orders: '30', description: 'Description of Product B' },
    { name: 'Product C', category: 'Category 3', price: '$150', orders: '40', description: 'Description of Product C' },
];

    const[log, setLog] = useState(true);
    const navigate = useNavigate()

return (
    <div className={styles.supplierPage}>

    <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <input type="text" placeholder="Search by name or category" className="sb"/>
                    <button 
                        className="button"
                        onClick={() => navigate("/home")}
                    >Home</button>
                    <button 
                        className="button"
                        onClick={() => navigate(-1)}
                    >Back</button>
                    <img src={user}
                                onClick={() => navigate("/supplier-profile")}
                                alt="User Profile" className="svg" /> 
                </div>
    </nav>
    <button 
        className="button"
        onClick={() => navigate("/add-product")}
    >Add Product</button>
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
            <span>{product.category}</span>
            <span>{product.price}</span>
            <span>{product.orders}</span>
            </div>
            <div className={styles.productCardDescription}>
           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dignissimos fugiat tenetur ab provident nihil similique hic at eligendi aspernatur ratione? Asperiores assumenda veniam dolore quibusdam numquam blanditiis ab harum dignissimos.
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, quia nostrum sequi animi harum quaerat itaque quidem aliquam quibusdam. Iste, accusantium. Tempore consequuntur quos aperiam vel sequi distinctio nemo dicta?
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, asperiores. Necessitatibus blanditiis debitis provident id. Tempore illo pariatur ut architecto ex, magni aliquam. Natus hic obcaecati qui alias ad? Sequi.
           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum molestiae facere exercitationem tempora necessitatibus quia recusandae incidunt nesciunt ut in, voluptates laboriosam aliquid amet id natus voluptas explicabo earum vero.
            </div>
        </div>
        ))}
    </div>
    </div>
);
};

export default SupplierPage;
