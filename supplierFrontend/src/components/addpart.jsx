import { useNavigate } from "react-router-dom"
import styles from "./addpart.module.css"

import {z} from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios"
import { useEffect, useState } from 'react'
import {PacmanLoader} from "react-spinners"


export default function Addpart(){

    const[auth, setAuth] = useState(false)
    const[successMessage, setSuccessMessage] = useState(null)
    const[errorMessage, setErrorMessage] = useState(null)
    useEffect(() => {
        axios.get("http://localhost:2000/supplier/add-product")
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

    const navigate = useNavigate();

    const addPartSchmea = z.object({
        partname : z.string().min(4, "Part name must contain atlest 4 chars"),
        category: z.string().min(1, "Category is required"),
        price: z.string()
                .transform((val) => parseFloat(val)) // Convert string to number
                .refine((val) => val > 0, { message: "Price must be greater than 0" }),
        desc : z.string().min(20, "Description must be atleast 20 characters")
    })

    const onAddPart = async(data) => {
        await axios.post("http://localhost:2000/supplier/add-product", data, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('supToken')}`
            }
    })
        .then((res) => {
            if(res.data.success === 1){
                setSuccessMessage(res.data.message)
                reset()
            }
            if(res.data.success === 2){
                setErrorMessage(res.data.message)
            }
        })
        .catch(err => {
            console.log(err.message)
        })

        setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
        }, 6000);
    }

    const{register, handleSubmit, formState:{errors}, reset} = useForm({
        resolver : zodResolver(addPartSchmea)
    })

    return(
        <>{auth ? 
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <button
                        className="button"
                        onClick={() => navigate("/supplier/home")}
                    >Home</button>
                    <button
                            className="button"
                            onClick={() => navigate(-1)}
                        >Back</button>
                </div>
            </nav>
            <div>
                    {successMessage && (
                        <span className="success">{successMessage}</span>
                    )}
                    {errorMessage && (
                        <span className="success">{errorMessage}</span>
                    )}
                    <form className={styles.form} onSubmit={handleSubmit(onAddPart)}>
                        <label htmlFor="partname" className={styles.lable}>Part Name :</label>
                        <input 
                            type="text" 
                            {...register('partname')} 
                            id="partname" 
                            className={styles.input}/>

                        {errors.partname && (
                            <span className="err">{errors.partname.message}</span>
                        )}
                        
                        <label htmlFor="category" className={styles.lable}>Category :</label>
                        <select 
                            {...register('category')} 
                            id="category" 
                            className={styles.input}
                        >
                            <option value="">Select a Category</option>
                            <option value="Engine Parts">Engine Parts</option>
                            <option value="Electrical Parts">Electrical Parts</option>
                            <option value="Suspension and Steering">Suspension and Steering</option>
                            <option value="Brake System Parts">Brake System Parts</option>
                            <option value="Transmission Parts">Transmission Parts</option>
                            <option value="Body and Frame Components">Body and Frame Components</option>
                            <option value="Cooling and Heating">Cooling and Heating</option>
                            <option value="Fuel System Parts">Fuel System Parts</option>
                            <option value="Lighting and Accessories">Lighting and Accessories</option>
                            <option value="Wheels and Tires">Wheels and Tires</option>
                        </select>
                        {errors.category && (
                            <span className="err">{errors.category.message}</span>
                        )}
                        <label htmlFor="price" className={styles.lable}>Price :</label>
                        <input 
                            type="text" 
                            {...register('price')}
                            id="price" 
                            className={styles.input}/>

                        {errors.price && (
                            <span className="err">{errors.price.message}</span>
                        )}
                        
                        <label htmlFor="desc" className={styles.lable}>Description :</label>
                        <textarea 
                            id="desc" 
                            {...register('desc')}
                            className={styles.textarea}></textarea>

                        {errors.desc && (
                            <span className="err">{errors.desc.message}</span>
                        )}

                        <button 
                            className="button"
                            // onClick={() => navigate("/supplier/products")}
                        >Add Part</button>
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