import { faBars, faBoxArchive, faChevronRight, faClipboardList, faTruckField, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Logo from "../../components/Logo";
import Sidebar from "../../components/Sidebar";
import Produtos from "./components/Produtos";
import "./css/index.css";
import "./css/sidebar.css";
import Clientes from "./components/Clientes";

export default function Home() {

    const [component, setComponent] = useState(<Produtos />)

    return (
        <div className="page home">
            <main>
                <header>
                    <Sidebar icon={faBars} side={"left"} cl="home-sidebar" title={<Logo />}>
                        <nav>
                            
                            <button onClick={() => setComponent(<Clientes />)}>Clientes <FontAwesomeIcon icon={faUsers} /></button>
                            <button onClick={() => setComponent(<Clientes />)}>Fornecedores <FontAwesomeIcon icon={faTruckField} /></button>
                            <button onClick={() => setComponent(<Produtos />)}>Produtos <FontAwesomeIcon icon={faBoxArchive} /></button>
                            <button>Pedidos <FontAwesomeIcon icon={faClipboardList} /></button>
                        </nav>
                        <div className="log-div">
                            <button>Sair <FontAwesomeIcon icon={faChevronRight} /></button>
                        </div>
                    </Sidebar>
                    <Logo />
                    <div className="opt-div">
                        <Sidebar icon={faUser} cl="login-modal" >
                            <div>
                                login
                            </div>
                        </Sidebar>
                    </div>
                </header>
                {component}
            </main>
        </div>
    )
}