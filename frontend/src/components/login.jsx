import { Link, useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import {z} from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import axios from 'axios'
import {PacmanLoader} from "react-spinners"


export default function Login(){
    const[auth, setAuth] = useState(false)
    const navigate = useNavigate();
    const[userErr, setUserErr] = useState(null)
    const[PasswordErr, setPasswordErr] = useState(null)
    useEffect(() => {

        axios.get("http://localhost:2000/user/login")
        .then((res) => {
            if(res.data.success){
                setAuth(true)
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const onLogin = async(data) => {
        await axios.post("http://localhost:2000/user/login", data)
        .then((res) => {
            if(res.data.success === 1){
                localStorage.setItem('token', res.data.token)
                navigate('/user')
            }
            else if(res.data.success === 2){
                setPasswordErr(res.data.message)
            }
            else if(res.data.success === 3){
                setUserErr(res.data.message)
            }
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    const loginSchema = z.object({
        username : z.string().min(4, "Username must contain atleast four letters"),
        password : z.string().min(8, "Password must contain atleast characters")
    })

    const {register, handleSubmit, formState : {errors}} = useForm({
        resolver : zodResolver(loginSchema)
    })

    
return (
        <>
        {auth ? 
        <div className={styles.main}>
        <nav className={styles.nav}>
            <p className="title">Spare Hub</p>
            <div>
                <input type="text" placeholder="Search by name or category" className="sb"/>
            </div>
            <button
                onClick={() => navigate("/user")}
                className='button'
                >Home</button>
        </nav>
        <div>
            <form className={styles.form} onSubmit={handleSubmit(onLogin)}>
            <label htmlFor='username'  className={styles.label}>Username or Email</label>
            <input 
                type="text" 
                {...register('username')}
                id='username' 
                placeholder="abc@gmail.com" 
                className={styles.input}/>
            
            {errors.username && (
                        <span className="err">{errors.username.message}</span>
            )}
            { userErr && (
                        <span className="err">{userErr}</span>
            )}
            
            <label htmlFor='password'  className={styles.label}>Password</label>
            <input 
                type="text"  
                id='password' 
                {...register('password')}
                placeholder="password" 
                className={styles.input}/>

            {errors.password && (
                        <span className="err">{errors.password.message}</span>
            )}
            { PasswordErr && (
                        <span className="err">{PasswordErr}</span>
            )}
            <button 
                className='button'>Login</button>
            <p className='new'>Are you new ? <Link to="/user/register" className={styles.a}>Sign Up</Link></p>
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



