import { useState, useEffect } from "react"
import { user } from "../img"
import styles from "./user.module.css"
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import axios from "axios";

const Card = ({partId, partName, price, categoryName}) => {
    return(
        <div className={styles.card}>
            <div>
                <div className={styles.info}>
                    <p>Part Id : {partId}</p>
                    <p>Part Name : {partName}</p>
                    <p>Price : {price}</p>
                    <p>Category Name : <br />{categoryName}</p>
                </div>
            </div>
        </div>
    )
}

export default function Part(){
    const navigate=useNavigate()

    const[auth, setAuth] = useState(false)
    const[part, setParts] = useState([])

    useEffect(() => {
        axios.get("http://localhost:2000/admin/parts")
        .then((res) => {
            if(res.data.success){
                setAuth(res.data.success)
                setParts(res.data.parts)
            }
        })
        .catch(err => {
            setAuth(false)
            console.log(err.message)
        })
    }, [])
    return(
        <>{auth ? 
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub-Admin</p>
                <div>
                    <input type="text" placeholder="Search by name or category" className="sb"/>
                    <button className="button" onClick={() => navigate("/admin/home")}>HOME</button>
                    <button className="button" onClick={() => navigate(-1)}>BACK</button>
                    <img src={user} alt="User Profile" className="svg" onClick={() => navigate("/admin/admin_profile")}/>
                </div>
            </nav>
            <p className={styles.catList}>Parts</p>
            <div className={styles.cards}>
                {part.map((item) => (
                    <Card key={item.part_id}
                        partId={item.part_id}
                        partName = {item.partName}
                        price={item.amount}
                        categoryName={item.name}
                        />
                ))}
            </div>
        </div>
        :
        <div className="loading">
                <PacmanLoader color="#FC7311" size={50} />
        </div>
    }</>
    )
}