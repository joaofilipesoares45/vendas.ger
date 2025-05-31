import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
    return (
        <div className={"page not-found-page " + styles["not-found-page"]}>

            <div>
                <FontAwesomeIcon icon={faExclamation}/>
                <h1>Url inválida</h1>
                <span>Está pagina não existe!</span>
                <Link to={"/"}>
                    <button>Voltar para Home</button>
                </Link>
            </div>

        </div>
    )
}