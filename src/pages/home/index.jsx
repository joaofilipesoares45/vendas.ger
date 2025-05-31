import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../components/Logo";
import Sidebar from "./components/Sidebar";
import "./css/index.css"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Clientes from "./components/Clientes";
import Produtos from "./components/Produtos";
import { useState } from "react";
import OverView from "./components/OverView";

export default function Home () {

    const [component, setComponent] = useState(<Produtos/>)

    return (
        <div className="page home">
            <Sidebar set={setComponent}/>
            <main>
                <header>
                    <Logo/>
                    <div className="opt-div">
                        <FontAwesomeIcon icon={faUser}/>
                    </div>
                </header>
                {component}
            </main>
        </div>
    )
}