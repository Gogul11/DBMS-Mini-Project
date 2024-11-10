import styles from "./addpart.module.css"


export default function Addpart(){

    return(
        <div className={styles.main}>
            <nav className={styles.nav}>
                <p className="title">Spare Hub</p>
                <button className="button">Home</button>
            </nav>
            <div>
                    <form className={styles.form}>
                        <label htmlFor="partname" className={styles.lable}>Part Name :</label>
                        <input type="text" name="partname" id="partname" className={styles.input}/>
                        
                        <label htmlFor="category" className={styles.lable}>Category :</label>
                        <input type="text" name="category" id="category" className={styles.input}/>
                        
                        <label htmlFor="price" className={styles.lable}>Price :</label>
                        <input type="text" name="price" id="price" className={styles.input}/>
                        
                        <label htmlFor="desc" className={styles.lable}>Description :</label>
                        <textarea name="desc" id="desc" className={styles.textarea}></textarea>

                        <button className="button">Add Part</button>
                    </form>
            </div>
        </div>
    )
}