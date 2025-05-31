import { useContext, useEffect, useRef } from "react"
import "../css/novo-produto.css"
import { DataContext } from "../../../context/DataContext"
import { closeModal, formCaptureData } from "../../../utils/functions"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm } from "react-hook-form"

export default function NovoProduto({ produto, set }) {
    const { produtos, setProdutos } = useContext(DataContext)

    const form = useRef(null)

    const { register, setValue } = useForm({
        defaultValues: {
            nome: "",
            valor_custo: 0,
            valor_venda: 0,
            estoque: 0
        }
    })

    const submit = (event) => {
        event.preventDefault()
        const data = formCaptureData(form.current)

        if (!data.nome || !data.valor_custo || !data.valor_venda || !data.estoque) {
            return
        }

        localStorage.setItem("vendas.ger:produtos", JSON.stringify([...produtos, data]))

        setProdutos([...produtos, data])

        form.current.reset()
        closeModal("novo-produto")
    }

    const update = (event) => {
       event.preventDefault()
        const data = formCaptureData(form.current)

        if (!data.nome || !data.valor_custo || !data.valor_venda || !data.estoque) {
            return
        }

        const newList = produtos

        newList.map((el, index) => {
            if (el.nome === produto.nome) {        
               newList[index] = data
            }
        })

        localStorage.setItem("vendas.ger:produtos", JSON.stringify([...newList]))
    
        setProdutos([...newList])

        form.current.reset()
        closeModal("novo-produto")
    }

    useEffect(() => {
        if (produto) {
            setValue("nome", produto.nome)
            setValue("valor_custo", produto.valor_custo)
            setValue("valor_venda", produto.valor_venda)
            setValue("estoque", produto.estoque)
        } else {
            setValue("", "", "", "")
        }
    }, [produto, setValue])

    return (
        <div className="modal novo-produto">
            <div className="content">
                <h3>{produto ? "Editar Produto" : "Novo Produto"}  <FontAwesomeIcon icon={faXmark} onClick={() => {
                    form.current.reset()
                    closeModal("novo-produto")
                    set()
                }} /></h3>
                <form onSubmit={produto ? update :  submit} autoComplete="off" ref={form}>
                    <div className="inputs">
                        <div>
                            <label htmlFor="nome">Nome</label>
                            <input type="text" name="nome" id="nome" {...register("nome")} />
                        </div>
                        <div>
                            <label htmlFor="valor_custo">Valor de custo</label>
                            <input type="number" name="valor_custo" id="valor_custo" {...register("valor_custo")} />
                        </div>
                        <div>
                            <label htmlFor="valor_venda">Valor de Venda</label>
                            <input type="number" name="valor_venda" id="valor_venda" {...register("valor_venda")} />
                        </div>
                        <div>
                            <label htmlFor="estoque">Estoque</label>
                            <input type="number" name="estoque" id="estoque" {...register("estoque")} />
                        </div>
                    </div>
                    <nav>
                        <button type="submit">Confirmar</button>
                    </nav>
                </form>
            </div>
        </div>
    )
}