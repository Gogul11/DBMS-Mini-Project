import { useNavigate } from 'react-router-dom'
import styles from './login.module.css'
import {z} from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import axios from "axios"
import { useEffect, useState } from 'react'
import {PacmanLoader} from "react-spinners"



export default function Login(){

        const[auth, setAuth] = useState(false)
        const[nameErr,setNameErr] = useState(null)
        const[passErr, setPassErr] = useState(null);

        const loginSchema = z.object({
            username : z.string().min(4, "Username must contain atleast four letters"),
            password : z.string().min(8, "Password must contain atleast characters")
        })

        const {register, handleSubmit, formState : {errors}} = useForm({
            resolver : zodResolver(loginSchema)
        })

        useEffect(() => {
            axios.get("http://localhost:2000/supplier")
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
            await axios.post("http://localhost:2000/supplier", data)
            .then((res) => {
                if(res.data.success === 1){
                    localStorage.setItem('supToken', res.data.token)
                    navigate("/supplier/home")
                }
                else if(res.data.success === 3){
                    setNameErr(res.data.message)
                }
                else if(res.data.success === 2){
                    setPassErr(res.data.message)
                }
            })
        }
        
        const navigate = useNavigate();
        return (
            <>{auth ? 
            <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
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
                {nameErr && (
                            <span className="err">{nameErr}</span>
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
                {passErr && (
                            <span className="err">{passErr}</span>
                )}
                <button 
                    className='button'
                    // onClick={() => navigate("/supplier/home")}
                >Login</button>
                </form>


            </div>
        </div>
        :
        <div className="loading">
            <PacmanLoader color="#FC7311" size={50}/>
        </div>}
        </>
        )
}



