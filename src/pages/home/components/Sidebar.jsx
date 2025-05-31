import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars, faBoxArchive, faChevronRight, faClipboardList, faTruckField, faUsers, faXmark } from "@fortawesome/free-solid-svg-icons"
import "../css/sidebar.css"
import { closeModal, openModal } from "../../../utils/functions"
import { useState } from "react"
import Logo from "../../../components/Logo"
import Clientes from "./Clientes"
import Produtos from "./Produtos"

export default function Sidebar({set}) {

    const [visible, setVisible] = useState(true)

    return (
        <div className="modal sidebar">
            <div className="content">
                <nav>
                    <Logo />
                    <button onClick={() => set(<Clientes/>)}>Clientes <FontAwesomeIcon icon={faUsers} /></button>
                    <button onClick={() => set(<Clientes/>)}>Fornecedores <FontAwesomeIcon icon={faTruckField} /></button>
                    <button onClick={() => set(<Produtos/>)}>Produtos <FontAwesomeIcon icon={faBoxArchive} /></button>
                    <button>Pedidos <FontAwesomeIcon icon={faClipboardList} /></button>
                </nav>
                <div className="log-div">
                    <button>Sair <FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
            </div>
            <FontAwesomeIcon icon={visible ? faBars : faXmark} onClick={() => {
                if (visible) {
                    openModal("sidebar")
                    setVisible(false)
                } else {
                    closeModal("sidebar")
                    setVisible(true)
                }
            }} className="open-" />
        </div>
    )
}