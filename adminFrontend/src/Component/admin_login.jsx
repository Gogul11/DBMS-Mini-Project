import { user } from "../img"
import { useEffect, useState } from "react"
import React from 'react';
import styles from './admin_login.module.css';
import { useNavigate } from "react-router-dom";
import {z} from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import {PacmanLoader} from "react-spinners"


const Admin_login = () => {
    const navigate=useNavigate()
    
    const[auth, setAuth] = useState(false)
    const[nameErr, setNameErr] = useState(null)
    const[passErr, setPassErr] = useState(null)
    
    useEffect(() => {
        axios.get("http://localhost:2000/admin/")
        .then((res) => {
            if(res.data.success){
                setAuth(true)
            }
        })
        .catch(err => {
            setAuth(false)
            console.log(err.message)
        })
    }, [])

    const onLogin = async(data) => {
        console.log(data)
        await axios.post('http://localhost:2000/admin/', data)
        .then((res) => {
            if(res.data.success === 1){
                localStorage.setItem('adminId', res.data.token)
                navigate("/admin/home")
            }
            else if(res.data.success === 3){
                setNameErr(res.data.message)
            }
            else if(res.data.success === 2){
                setPassErr(res.data.message)
            }
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    const loginSchema=z.object({
        adminname : z.string().min(4,"Adminname must contain atleast 4 letters"),
        password : z.string().min(8,"Password must contain 8 characters")
    })

    const {register, handleSubmit, formState: {errors} } =useForm({
        resolver : zodResolver(loginSchema)
    })
    return (
        <>{auth ? 
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

                    {nameErr && (
                            <span className="err">{nameErr}</span>
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
                    {passErr && (
                            <span className="err">{passErr}</span>
                    )}
                    <button type="submit" 
                        className={styles.confirmButton}
                    >Confirm</button>
                </form>
            </div>
        </div>
        :
        <div className="loading">
            <PacmanLoader color="#FC7311" size={50}/>
        </div>
    }</>

    );
};

export default Admin_login;