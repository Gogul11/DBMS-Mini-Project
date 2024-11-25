import { useEffect, useState } from "react"
import { user } from "../img"
import styles from "./list.module.css"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import {PacmanLoader} from "react-spinners"


const Card = ({id,name, category, price}) => {
    const navigate = useNavigate()
    return(
        <div className={styles.card}>
            <div>
                <img className={styles.img} src="https://placehold.jp/150x150.png" alt="Profile Picture" />
                <div className={styles.info}>
                    <p>{name}</p>
                    <p>{category}</p>
                    <p>{price}</p>
                </div>
            </div>
            <button 
                className="button"
                onClick={() => navigate(`/user/parts/info/${id}`)}
            >More Info</button>
    </div>
    )
}

export default function List(){

    const navigate = useNavigate()

    const[log, setLog] = useState(true)
    const[auth, setAuth] = useState(false)
    const[list, setList] = useState(null)
    const[val, setVal] = useState('')

    useEffect(() => {
        
        const token = localStorage.getItem('token');
        setLog(token); 

        axios.get("http://localhost:2000/user/parts")
        .then((res) => {
            if(res.data.success){
                setAuth(true)
                setList(res.data.parts)
            }
        })
        .catch((err) => {
            console.log(err)
        })

    },[])

    const search = (e) => {
        if(e.key === 'Enter'){
            axios.get(`http://localhost:2000/user/parts?name=${val}`)
            .then((res) => {
                if(res.data.success){
                    setAuth(true)
                    setPart(res.data.part)
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }


    return(
        <>
        {auth ? 
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <div>
                    <input type="text" 
                        placeholder="Search by name or category" 
                        className="sb"
                        value={val}
                        onChange={(e) => setVal(e.target.value)}
                        onKeyDown={search}/>
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
            <div className={styles.cards}>
                {
                    list.map((item) => (
                        <Card 
                            id={item.part_id} 
                            name={item.part_name} category={item.category_name} price={item.price}/>
                    ))
                }
            </div>
        </div>
        :
        <div className="loading">
            <PacmanLoader color="#FC7311" size={50}/>
        </div>
        }</>
    )
}
