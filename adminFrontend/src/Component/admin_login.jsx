import { user } from "../img"
import { useState } from "react"
import React from 'react';
import styles from './admin_login.module.css';
import { useNavigate } from "react-router-dom";
import {z} from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const Admin_login = () => {
    const navigate=useNavigate()
    
    const onLogin = (data) => {
        console.log(data) 
    }

    const loginSchema=z.object({
        adminname : z.string().min(4,"Adminname must contain atleast 4 letters"),
        password : z.string().min(8,"Password must contain 8 characters")
    })

    const {register, handleSubmit, formState: {errors} } =useForm({
        resolver : zodResolver(loginSchema)
    })
    return (
        <div className={styles.main}>
        <nav className={styles.nav}>
                <p className="title">Spare Hub-Admin</p>
            </nav>
        <div className={styles.body}>
        <h2 className={styles.title}>Admin Login</h2>
        <form className={styles.form} onSubmit={handleSubmit(onLogin)}>
            <label htmlFor="adminname">Admin Name</label>
            <input 
                type="text" 
                {...register('adminname')}
                placeholder="admin name"
                id="adminname"
                />
            
            {errors.adminname && (
                    <span className="err" >{errors.adminname.message}</span>
            )}
            
            <label htmlFor="password">Password</label>
            <input 
                type="password"
                {...register('password')}
                placeholder="Password"
                id="password" 
                />
            {errors.password && (
                    <span className="err" >{errors.password.message}</span>
            )}
            
            <button type="submit" className={styles.confirmButton}>Confirm</button>
        </form>
        </div>
        </div>
    );
};

export default Admin_login;