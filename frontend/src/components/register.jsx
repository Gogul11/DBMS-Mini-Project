import { Link, useNavigate } from "react-router-dom"
import styles from "./register.module.css"
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import { useEffect, useState } from "react";
import axios from 'axios'
import {PacmanLoader} from "react-spinners"


export default function Register(){

    const navigate = useNavigate();
    const[auth, setAuth] = useState(false)

    const[nameErr, setNameErr] = useState(null)
    const[mailErr, setMailErr] = useState(null)
    const[numErr, setNumErr] = useState(null)

    useEffect(() => {

        axios.get("http://localhost:2000/user/register")
        .then((res) => {
            if(res.data.success){
                setAuth(true)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const registerSchema = z.object({
        username : z.string().min(4, "Username must contain atleast four characters"),
        email : z.string().email(),
        phone_number: z.string()
                        .min(10, "Phone number must contain at least 10 digits")
                        .max(15, "Phone number can contain at most 15 digits")
                        .regex(/^\d{10,15}$/, "Phone number must contain only digits (no spaces, hyphens, etc.)"),
        password : z.string().min(8, "Password must contain atleast 8 characters"),
        cPassword : z.string().min(8, "Confirm Password must contain atleast 8 characters")
    })
    .refine((data) => data.password === data.cPassword, {
        message : "Password and confirm password must match",
        path : ['cPassword']
    })

    const onRegister = async(data) => {
        // console.log(data)
        // await axios.post("http://localhost:2000/user/register", data)
        // .then((res) => {
        //     if(res.data.success === 1){
        //         navigate('/user/login')
        //     }
        //     else if(res.data.success === 2){
        //         setNameErr(res.data.message)
        //     }
        //     else if(res.data.success === 3){
        //         setMailErr(res.data.message)
        //     }
        //     else if(res.data.success === 4){
        //         setNumErr(res.data.message)
        //     }
        // })
        // .catch((err) => {
        //     console.log(err)
        // })

        try {
            const response = await axios.post("http://localhost:2000/user/register", data);
    
            if (response.data.success) {
                navigate('/user/login');
            }
        } catch (err) {
            if (err.response?.status === 400) {
                const message = err.response.data.message;
                if (message.includes('username')) setNameErr(message);
                else if (message.includes('email')) setMailErr(message);
                else if (message.includes('phone number')) setNumErr(message);
            } else {
                console.error("Unexpected error:", err);
            }
        }
    }
    const{register, handleSubmit, formState:{errors}} = useForm({
        resolver : zodResolver(registerSchema)
    })

return(
    <>
    {auth ? 
    <div className={styles.main}>
        <nav className={styles.nav}>
            <p className="title">Spare Hub</p>
            <div>
                <input type="text" placeholder="Search by name or category" className="sb"/>
            </div>
            <button 
                className="button"
                onClick={() => navigate("/user")}
            >Home</button>
        </nav>
        <div>
                <form className={styles.form} onSubmit={handleSubmit(onRegister)}>
                    <label htmlFor="username" className={styles.lable}>User Name :</label>
                    <input 
                        type="text" 
                        {...register('username')}
                        id="username" 
                        className={styles.input}
                        />

                    {errors.username && (
                        <span className="err">{errors.username.message}</span>
                    )}
                    {nameErr && (
                        <span className="err">{nameErr}</span>
                    )}

                    <label htmlFor="email" className={styles.lable}>Email :</label>
                    <input 
                        type="email" 
                        {...register('email')} 
                        id="email" 
                        className={styles.input}/>

                    {errors.email && (
                        <span className="err">{errors.email.message}</span>
                    )}
                    {mailErr && (
                        <span className="err">{mailErr}</span>
                    )}

                    <label htmlFor="phnum" className={styles.lable}>Phone Number :</label>
                    <input 
                        type="text" 
                        {...register('phone_number')} 
                        id="phnum" 
                        className={styles.input}/>

                    {errors.phone_number && (
                        <span className="err">{errors.phone_number.message}</span>
                    )}
                    {numErr && (
                        <span className="err">{numErr}</span>
                    )}

                    <label htmlFor="password" className={styles.lable}>password :</label>
                    <input 
                        type="password" 
                        {...register('password')}
                        id="password" 
                        className={styles.input}/>

                    {errors.password && (
                        <span className="err">{errors.password.message}</span>
                    )}
                    
                    <label htmlFor="cPassword" className={styles.lable}>Confirm Password :</label>
                    <input 
                        type="password" 
                        {...register('cPassword')}
                        id="cPassword" 
                        className={styles.input}/>
                        
                    {errors.cPassword && (
                        <span className="err">{errors.cPassword.message}</span>
                    )}

                    <button 
                        className="button"
                        type="submit"
                    >Register</button>
                </form>
        </div>
    </div>
    :
        <div className="loading">
            <PacmanLoader color="#FC7311" size={50}/>
        </div>
    }</>
    )
}