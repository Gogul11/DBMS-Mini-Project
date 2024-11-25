import { user } from "../img"
import { useEffect, useState } from "react"
import React from 'react';
import styles from './admin_supplier.module.css';
import { useNavigate } from "react-router-dom";
import {z} from "zod"
import { useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios";
import { PacmanLoader } from "react-spinners";

const Admin_supplier = () => {
    const navigate=useNavigate()

    const[auth, setAuth] = useState(false)
    const[nameErr, setNameErr] = useState(false)
    const[mailErr, setMailErr] = useState(false)
    const[phoneErr, setPhoneErr] = useState(false)
    const[add, setAdd] = useState(false)


    useEffect(() => {
        axios.get('http://localhost:2000/admin/add-supplier')
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
        await axios.post('http://localhost:2000/admin/add-supplier', data)
        .then((res) => {
            if(res.data.success === 1){
                setAdd(res.data.message)
                setMailErr(null)
                setPhoneErr(null)
                setNameErr(null)
                reset()
            }
            else if(res.data.success === 3){
                setNameErr(res.data.message)
                setMailErr(null)
                setPhoneErr(null)
            }
            else if(res.data.success === 4){
                setMailErr(res.data.message)
                setNameErr(null)
                setPhoneErr(null)
            }
            else if(res.data.success === 5){
                setPhoneErr(res.data.message)
                setMailErr(null)
                setNameErr(null)
            }
        })
        .catch(err => {
            console.log(err.message)
        })

        setTimeout(() => {
            setAdd('');
    }, 6000);
    }

    const loginSchema=z.object({
        suppliername : z.string().min(4,"Suppliername must contain atleast 4 letters"),
        supplieremail : z.string().email(),
        supplierphone : z.string().min(10,"Phone number must contain 10 characters"),
        supplieraddress : z.string().min(10,"Give valid address"),
        password : z.string().min(8,"Password must contain 8 characters"),
        confirmpassword : z.string().min(8,"Password must contain 8 characters")
    })
    .refine((data) => data.password === data.confirmpassword, {
        message : "Password and confirm password must match",
        path : ['confirmpassword']
    })

    const {register, handleSubmit, formState: {errors}, reset } =useForm({
        resolver : zodResolver(loginSchema)
    })

    return (
        <>{auth ? 
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub-Admin</p>
                <div>
                    <button className="button" onClick={() => navigate(-1)}>BACK</button>
                    <img src={user} alt="User Profile" className="svg" /> 
                </div>
            </nav>
            <div className={styles.body}>
                    <h2 className={styles.title}>Supplier Details</h2>
                {add && (
                    <span className="success">{add}</span>
                )}
                <form className={styles.form} onSubmit={handleSubmit(onLogin)}>
                    <label htmlFor="suppliername">Supplier Name</label>
                    <input 
                        type="text" 
                        {...register('suppliername')}
                        placeholder="Supplier name" 
                        id="suppliername"
                    />

                    {errors.suppliername && (
                            <span className="err" >{errors.suppliername.message}</span>
                    )}

                    {nameErr && (
                        <span className="err">{nameErr}</span>
                    )}

                    <label htmlFor="supplieremail">Supplier Email</label>
                    <input 
                        type="email" 
                        {...register('supplieremail')}
                        placeholder="abc@gmail.com" 
                        id="supplieremail"
                    />

                    {errors.supplieremail && (
                            <span className="err" >{errors.supplieremail.message}</span>
                    )}

                    {mailErr && (
                        <span className="err">{mailErr}</span>
                    )}

                    <label htmlFor="supplierphone">Supplier Phone</label>
                    <input 
                        type="text" 
                        {...register('supplierphone')}
                        placeholder="phone" 
                        id="supplierphone"
                    />
                    
                    {errors.supplierphone && (
                            <span className="err" >{errors.supplierphone.message}</span>
                    )}

                    {phoneErr && (
                        <span className="err">{phoneErr}</span>
                    )}

                    <label htmlFor="supplieraddress">Supplier Address</label>
                    <input 
                        type="text" 
                        {...register('supplieraddress')}
                        placeholder="Address"
                        id="supplieraddress"
                        />
                    
                    {errors.supplieraddress && (
                            <span className="err" >{errors.supplieraddress.message}</span>
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

                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input 
                        type="password" 
                        {...register('confirmpassword')}
                        placeholder="Password"
                        id="confirmpassword" 
                    />

                    {errors.confirmpassword && (
                            <span className="err" >{errors.confirmpassword.message}</span>
                    )}
                    
                    <button type="submit" className={styles.confirmButton}>Confirm</button>
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

export default Admin_supplier;