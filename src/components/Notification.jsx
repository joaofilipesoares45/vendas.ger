import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { closeModal } from "../utils/functions";
import styles from "./Notification.module.css";

export default function Notification() {
    const { notification, setNotification } = useContext(DataContext)

    const close = () => {
        setNotification()
        closeModal("notification")
    }

    return (
        <div className={`modal notification ${styles.notification}`} type={notification && notification.type}>
            {notification &&
                <div className={styles.content}>
                    <div className={styles.info} type={notification.type}>
                        <h2>{notification.title}<FontAwesomeIcon icon={faXmark} onClick={close} /></h2>
                        <p>{notification.text}</p>
                    </div>
                    {notification.type === 3 &&
                        <nav>
                            {notification.options.map((el, index) => {
                                if (el.tag === "button") {
                                    return <button onClick={() => {
                                        close()
                                        if (el.fun !== "close") {
                                            el.fun()
                                        }
                                    }} key={"opt" + index} style={{ "--back": el.color }}>{el.text}</button>
                                }
                                if (el.tag === "a") {
                                    return <a href={el.link} onClick={el.fun === "close" ? close : el.fun} key={"opt" + index} style={{ color: el.color }}>{el.text}</a>
                                }
                            })}
                        </nav>}
                </div>}
        </div>
    )

}