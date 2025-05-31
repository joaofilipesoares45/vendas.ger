import { numberForBrl, openModal } from "../../../utils/functions";
import NovoProduto from "./NovoProduto";
import "../css/produtos.css"
import { useContext, useState } from "react";
import { DataContext } from "../../../context/DataContext";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NotificationBtn from "../../../Classes/NotificationBtn";

export default function Produtos() {
    const { produtos, setProdutos, newNotification } = useContext(DataContext)
    const [produto, setProduto] = useState()
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

    const deleteProduct = () => {
        const newList = produtos.filter((_, index)=> (index !== selected))
        setProdutos(newList)
        setSelected(9999)
    }

    return (
        <section className="produtos">
            <NovoProduto produto={produto} set={setProduto} />
            <button className="novo-produto-btn" onClick={() => openModal("novo-produto")}>Novo Produto</button>
            <div className="search-div">
                <h3 className="title">Produtos</h3>
                <form onSubmit={(event) => event.preventDefault()} onKeyUp={search} autoComplete="off" >
                    <div className="inputs">
                        <div>
                            <label htmlFor="nome">Nome do Produto</label>
                            <input type="text" id="nome" name="nome" onFocus={({ target }) => {
                                target.parentElement.querySelector(".list").setAttribute("view", "")
                            }} onBlur={({ target }) => {
                                setTimeout(() => target.parentElement.querySelector(".list").removeAttribute("view"), 100)
                            }} />
                            <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                            <div className="list">
                                {produtos.length > 0 ? produtos.map((item, index) => {
                                    return (
                                        <button key={"cl" + index} className="item" onClick={({ target }) => {
                                            target.parentElement.parentElement.querySelector("input").value = target.textContent
                                            setSelected(index)
                                        }}>{item.nome}</button>
                                    )
                                }) : <p>Nenhum produto cadastrado!</p>}
                            </div>
                        </div>
                    </div>
                </form>
            </div>


            {selected !== 9999 &&
                <div className="produto-div">
                    <h3>{produtos[selected].nome}</h3>
                    <p>Valor de custo: {numberForBrl(produtos[selected].valor_custo)}</p>
                    <p>Valor de venda: {numberForBrl(produtos[selected].valor_venda)}</p>
                    <span>Estoque: {produtos[selected].estoque || 0}un</span>
                    <div className="options">
                        <button onClick={() => {
                            setProduto(produtos[selected])
                            openModal("novo-produto")
                        }}>Editar dados</button>
                        <button onClick={() => {
                            newNotification(3, "Excluir", "Quer mesmo deletar esse produto?", [new NotificationBtn({
                                text: "Excluir", tag: "button", fun: () => {
                                    deleteProduct()
                                }, color: "blue"
                            })])
                        }}>Excluir produto</button>
                    </div>
                </div>}
        </section>
    )
}