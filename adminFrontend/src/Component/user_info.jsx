import { useEffect, useState } from "react"
import { user } from "../img"
import styles from "./user.module.css"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { PacmanLoader } from "react-spinners";


const Card = ({id, name, email}) => {
    const navigate=useNavigate()
    return(
        <div className={styles.card}>
                    <p>User Id : {id}</p>
                    <p>Name : {name}</p>
                    <p>Email : {email}</p>
        </div>
    )
}

export default function User(){

    const navigate=useNavigate()

    const[users, setUser] = useState([])
    const[auth, setAuth] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:2000/admin/user")
        .then((res) => {
            if(res.data.success){
                setAuth(res.data.success)
                setUser(res.data.user)
            }
        })
        .catch(err => {
            console.log(err)
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
            <p className={styles.catList}>User</p>
            <div className={styles.cards}>
                {
                    users.map((item) => (
                        <Card 
                            id={item.user_id} 
                            name={item.username} 
                            email={item.email}
                            key={item.user_id}
                        />
                    ))
                }
            </div>
        </div>
        :
        <div className="loading">
                    <PacmanLoader color="#FC7311" size={50} />
        </div>
        }</>
    )
}