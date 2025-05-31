import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../css/novo-cliente.css"
import { closeModal, formCaptureData } from "../../../utils/functions"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useContext, useEffect, useRef } from "react"
import { DataContext } from "../../../context/DataContext"
import { useForm } from "react-hook-form"

export default function NovoCliente({ cliente, set }) {
    const { clientes, setClientes } = useContext(DataContext)

    const form = useRef(null)

    const { register, setValue } = useForm({
        defaultValues: {
            nome: "",
            email: "",
            telefone: "",
            apelido: ""
        }
    })

    const submit = (event) => {
        event.preventDefault()
        const data = formCaptureData(form.current)

        if (!data.nome) {
            return
        }

        data.debito_total = 0
        data.vendas = []
        data.recebimentos = []
        data.pedidos = []

        localStorage.setItem("vendas.ger:clientes", JSON.stringify([...clientes, data]))

        setClientes([...clientes, data])

        form.current.reset()
        closeModal("novo-cliente")
    }

    const update = (event) => {
        event.preventDefault()
        const data = formCaptureData(form.current)

        if (!data.nome) {
            return
        }

        const newList = clientes

        newList.map((el, index) => {
            if (el.nome === cliente.nome) {
                newList[index] = data
            }
        })

        localStorage.setItem("vendas.ger:clientes", JSON.stringify([...newList]))

        setClientes([...newList])

        form.current.reset()
        closeModal("novo-produto")
    }

    useEffect(() => {
        if (cliente) {
            setValue("nome", cliente.nome)
            setValue("email", cliente.email)
            setValue("telefone", cliente.telefone)
            setValue("apelido", cliente.apelido)
        } else {
            setValue("", "", "", "")
        }
    }, [cliente, setValue])

    return (
        <div className="modal novo-cliente">
            <div className="content">
                <h3>{cliente ? "Editar Cliente" : "Novo Cliente"} <FontAwesomeIcon icon={faXmark} onClick={() => {
                    form.current.reset()
                    closeModal("novo-cliente")
                    set()
                }} /></h3>
                <form onSubmit={cliente ? update : submit} autoComplete="off" ref={form}>
                    <div className="inputs">
                        <div>
                            <label htmlFor="nome">Nome</label>
                            <input type="text" name="nome" id="nome" {...register("nome")} />
                        </div>
                        <div>
                            <label htmlFor="email">email</label>
                            <input type="text" name="email" id="email" {...register("email")} />
                        </div>
                        <div>
                            <label htmlFor="telefone">telefone/celular</label>
                            <input type="text" name="telefone" id="telefone" {...register("telefone")} />
                        </div>
                        <div>
                            <label htmlFor="apelido">apelido</label>
                            <input type="text" name="apelido" id="apelido" {...register("apelido")} />
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