import { useState, useEffect } from "react";
import { user } from "../img";
import styles from "./user.module.css";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import axios from "axios";

const Card = ({ sId, name, mail }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.card}>
                    <p>Id : {sId}</p>
                    <p>Name : {name}</p>
                    <p>Mail : {mail}</p>
        </div>
    );
};

export default function Supplier() {
    const navigate = useNavigate();

    const [supplier, setSupplier] = useState([]);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        axios
            .get("http://localhost:2000/admin/supplier")
            .then((res) => {
                if (res.data.success) {
                    setAuth(true);
                    setSupplier(res.data.supplier);
                }
            })
            .catch((err) => {
                setAuth(false);
            });
    }, []);

    return (
        <>
            {auth ? (
                <div className={styles.main}>
                    <nav className={styles.nav}>
                        <p className="title">Spare Hub-Admin</p>
                        <div>
                            <input
                                type="text"
                                placeholder="Search by name or category"
                                className="sb"
                            />
                            <button
                                className="button"
                                onClick={() => navigate("/admin/add-supplier")}
                            >
                                Add Supplier
                            </button>
                            <button
                                className="button"
                                onClick={() => navigate("/admin/home")}
                            >
                                HOME
                            </button>
                            <button className="button" onClick={() => navigate(-1)}>
                                BACK
                            </button>

                            <img
                                src={user}
                                alt="Supplier Profile"
                                className="svg"
                                onClick={() => navigate("/admin/admin_profile")}
                            />
                        </div>
                    </nav>
                    <p className={styles.catList}>Supplier</p>
                    <div className={styles.cards}>
                        {supplier.map((item) => (
                            <Card
                                key={item.supplier_id}
                                sId={item.supplier_id}
                                name={item.supplier_name}
                                mail={item.email}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="loading">
                    <PacmanLoader color="#FC7311" size={50} />
                </div>
            )}
        </>
    );
}
