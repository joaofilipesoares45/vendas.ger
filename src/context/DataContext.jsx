import { createContext, useEffect, useState } from "react";
import { openModal } from "../utils/functions";

export const DataContext = createContext();

export function DataProvider({ children }) {
    const [usuarioAtual, setUsuarioAtual] = useState()
    const [notification, setNotification] = useState()
    const [colorMode, setColorMode] = useState(true)
    const [clientes, setClientes] = useState([])
    const [produtos, setProdutos] = useState([])

    const newNotification = (type, title, text, options) => {
        setNotification({type, title, text, options})
        openModal('notification')
    }

    useEffect(() => {
        if (localStorage.getItem("vendas.ger:clientes") !== null) {
            setClientes(JSON.parse(localStorage.getItem("vendas.ger:clientes")))
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem("vendas.ger:clientes") !== null) {
            setProdutos(JSON.parse(localStorage.getItem("vendas.ger:produtos")))
        }
    }, [])

    const value = {
        colorMode, 
        setColorMode,
        usuarioAtual, 
        setUsuarioAtual,
        notification, 
        setNotification,
        newNotification,
        clientes, 
        setClientes,
        produtos, 
        setProdutos,
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}