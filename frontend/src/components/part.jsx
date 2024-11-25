import { useEffect, useState } from "react"

import styles from "./part.module.css"
import { Gstar, star, user } from "../img"
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"
import axios from "axios"
import {PacmanLoader} from "react-spinners"
import {z} from "zod"
import {useForm} from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'



const Review = ({username, date, comment, rating}) => {

    return(
        <div className={styles.reviewPart}>
            <div>
                <p>{username}</p>
                <div>
                    <p>{new Date(date).toISOString().split('T')[0]}</p>
                    {[...Array(5)].map((_, index) => (
                            <img
                                key={index}
                                src={index < rating ? star : Gstar} // Show filled or empty star
                                className={styles.star}
                            />
                        ))}
                </div>
            </div>
            <p className={styles.comm}>Comments : </p>
                <div className={styles.reviewText}>
                        {comment}
                </div>
        </div>
    )
}

export default function Part(){

    const[log, setLog] = useState(true)
    const[quan, setQuan] = useState(1)
    const[search,setSearch] = useState('')

    const navigate = useNavigate()

    const[auth, setAuth] = useState(false)
    const[part, setPart] = useState(null)
    const[supp_name, setSupp_name] = useState(null)

    const[reviews, setReviews] = useState([])

    const { id } = useParams()

    const[show, setShow] = useState(false)
    const[message, setMessage] = useState(null)

    useEffect(() => {

        const token = localStorage.getItem('token');
        setLog(token);

        axios.get(`http://localhost:2000/user/parts/info/${id}`)
        .then((res) => {
            if(res.data.success){
                setAuth(true)
                setPart(res.data.part[0])
                setSupp_name(res.data.supp)
                setReviews(res.data.review)
            }
        })
        .catch((err) => {
            console.log(err)
        })

        setTimeout(() => {
            setMessage('');
    }, 6000);

    },[])
    
    // const handleSearch = async() => {
        
    //     await axios.get(`http://localhost:2000/user/parts/${id}`)
    //     .then((res) => {
    //         if(res.data.success){
    //             setAuth(true)
    //             setPart(res.data.part[0])
    //         }
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     })
    // }

    const reviewSchema = z.object({
        review : z.string(),
        rating: z
            .number({ invalid_type_error: 'Rating must be a number' })
            .min(1, 'Rating must be at least 1')
            .max(5, 'Rating cannot exceed 5'),
    })

    const {register, handleSubmit, formState : {errors}, reset} = useForm({
        resolver : zodResolver(reviewSchema)
    })

    const onReview = async(data) => {
        console.log(data)
        
        const newData = {
            ...data,
            part_id : id
        }
        await axios.post("http://localhost:2000/user/review", newData, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}` 
            }
        })
        .then((res) => {
            if(res.data.success){
                setMessage(res.data.message)
                setShow(p => !p)
                reset() 
            }
        })
        .catch(err => {
            console.log(err.message)
            setMessage(err.message)
        })
    }

    return(
        <>
        {auth ? 
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <input 
                        type="text" 
                        placeholder="Search by name or category" 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        // onClick={handleSearch}
                        className="sb"/>
                    {
                        log ? (
                                <img src={user} 
                                    alt="User Profile" 
                                    className="svg"
                                    onClick={() => navigate("/user/profile")}
                                    /> 
                        ):(
                            <button 
                                className="button"
                                onClick={() => navigate("/user/login")}
                            >Login</button>
                        )
                    }
                    <button 
                        className="button"
                        onClick={() => navigate(-1)}
                            >Back</button>
                </div>
            </nav>
            <div className={styles.partInfo}>
                <div>
                    <img src="https://placehold.jp/300x300.png" alt="" />
                </div>
                <div>
                    <p>{part.part_name}</p>
                    <p>{part.category_name}</p>
                    <div>
                        <p>{part.price * quan}</p>
                        {quan >+ 1 &&
                            <button className = {styles.quanBut} onClick={() => setQuan(quan - 1)}>-</button>
                        }
                        <p>{quan}</p>
                        <button className={styles.quanBut} onClick={() => setQuan(quan + 1)}>+</button>
                    </div>
                    <p>{supp_name}</p>
                    <button 
                        className="button"
                        onClick={() => navigate(`/user/buy/${part.part_id}`)
                        }
                    >BUY NOW</button>
                </div>
            </div>
            <div className={styles.desc}>
                <p className={styles.Title}>Description : </p>
                <p className={styles.description}>
                        {part.description}
                </p>
            </div>
                <p className={styles.Title}>Reviews</p>
                <button 
                    className="button"
                    onClick={() => setShow((p) => !p)}
                >Write a Review</button>
                {message && (
                    <span>{message}</span>
                )}
                {show && (

                    <div className={styles.reviewForm}>
                        <form onSubmit={handleSubmit(onReview)}>
                            <label className={styles.label} htmlFor="review">Review Comment : </label><br />
                            <textarea 
                                {...register('review')}
                                id="review" className={styles.textarea}></textarea> <br />
                            {errors.review && (
                                <span className="err">{errors.review.message}</span>
                            )}
                            <br />
                            <label className={styles.label} htmlFor="rating">Ratings : </label> <br />
                            <input
                                id="rating"
                                type="number"
                                min="1"
                                max="5"
                                {...register('rating', { valueAsNumber: true })}
                                /> <br />
                            {errors.rating && (
                                <span className="err">{errors.rating.message}</span>
                            )}
                            <br />
                            <button className="button">Post</button>
                        </form>
                    </div>
                )}
            <div className={styles.reviews}>
                {reviews.map((item) => (
                    <Review
                        key={item.order_id}
                        username={item.username}
                        date={item.created_at}
                        comment={item.comment}
                        rating= {item.rating}
                    />
                ))}
            </div>
        </div>
        :
        <div className="loading">
            <PacmanLoader color="#FC7311" size={50}/>
        </div>
        }</>
    )
}