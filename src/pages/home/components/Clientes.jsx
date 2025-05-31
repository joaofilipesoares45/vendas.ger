import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../css/clientes.css"
import { useContext, useState } from "react";
import { DataContext } from "../../../context/DataContext";
import NotificationBtn from "../../../Classes/NotificationBtn";
import NovoCliente from "./NovoCliente";
import { openModal } from "../../../utils/functions";

export default function Clientes() {
    const { newNotification, clientes, setClientes } = useContext(DataContext)

    const [cliente, setCliente] = useState()
    const [selected, setSelected] = useState(9999)

    const search = ({ target }) => {
        const value = target.value.toUpperCase()
        const divs = target.parentElement.querySelectorAll(".list .item")

        divs.forEach(el => el.removeAttribute("hidden"))
        divs.forEach(el => {
            const text = el.textContent.toUpperCase()
            if (!text.includes(value)) {
                el.setAttribute("hidden", "")
            }
        });
    }

    const deleteClient = () => {
        const newList = clientes.filter(el => el.nome !== cliente.nome)
        setClientes(newList)
        setCliente()
    }

    return (
        <section className="clientes">
            <NovoCliente cliente={cliente} set={setCliente}/>
            <button className="novo-cliente-btn" onClick={() => openModal("novo-cliente")}>Novo Cliente</button>

            <div className="search-div">
                <h3 className="title">Clientes</h3>
                <form onSubmit={(event) => event.preventDefault()} onKeyUp={search} autoComplete="off" >
                    <div className="inputs">
                        <div>
                            <label htmlFor="nome">Nome do Cliente</label>
                            <input type="text" id="nome" name="nome" onFocus={({ target }) => {
                                target.parentElement.querySelector(".list").setAttribute("view", "")
                            }} onBlur={({ target }) => {
                                setTimeout(() => target.parentElement.querySelector(".list").removeAttribute("view"), 100)
                            }} />
                            <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                            <div className="list clientes-list">
                                {clientes.length > 0 ? clientes.map((item, index) => {
                                    return (
                                        <button key={"cl" + index} className="item" onClick={({ target }) => {
                                            target.parentElement.parentElement.querySelector("input").value = target.textContent
                                            setSelected(index)
                                        }}>{item.nome}</button>
                                    )
                                }) : <p>Nenhum cliente cadastrado!</p>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {selected !== 9999 &&
                <div className="cliente-div">
                    <h3>{clientes[selected].nome}</h3>

                    <div className="options">
                        <button>Vendas</button>
                        <button>Recebimentos</button>
                        <button>Pedidos</button>
                        <button onClick={() => {
                            setCliente(clientes[selected])
                            openModal("novo-cliente")
                            }}>Editar dados</button>
                        <button onClick={() => {
                            newNotification(3, "Excluir", "Quer mesmo deletar esse cliente?", [new NotificationBtn({
                                text: "Excluir", tag: "button", fun: () => {
                                    deleteClient()
                                }, color: "blue"
                            })])
                        }}>Excluir cliente</button>
                    </div>
                </div>}
        </section>
    )
}