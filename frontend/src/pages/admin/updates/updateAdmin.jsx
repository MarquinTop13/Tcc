import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import CabecalhoAdmin2 from "../../../components/headerAdmin2"
import { useState, useEffect } from "react"
import "./updateAdmin.scss"
import apiLink from "../../../axios.js"

export default function UpdateAdmin() {
    // Modo escuro
    const [darkTheme, setDarkTheme] = useState(() => {
        const themeSaved = localStorage.getItem("TemaEscuro")
        return themeSaved ? themeSaved === "true" : false
    })

    // Estado para os updates
    const [updates, setUpdates] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    function ChangeTheme() {
        setDarkTheme(prevTheme => !prevTheme)
    }

    // Carregar updates do backend
    async function carregarUpdates() {
        try {
            setLoading(true)
            const response = await apiLink.get('/ListarUpdates')
            setUpdates(response.data.updates || [])
            setError("")
        } catch (error) {
            console.error('Erro ao carregar updates:', error)
            setError("Erro ao carregar as atualizações")
            setUpdates([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        carregarUpdates()
    }, [])

    useEffect(() => {
        document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`
    }, [darkTheme])

    useEffect(() => {
        localStorage.setItem("TemaEscuro", darkTheme.toString())
    }, [darkTheme])

    // Função para formatar data (fallback)
    function formatarData(data) {
        if (!data) return "Data não informada"
        
        // Se já veio formatada do backend
        if (typeof data === 'string' && data.includes('/')) {
            return data
        }
        
        // Tenta formatar a data
        try {
            const dataObj = new Date(data)
            return dataObj.toLocaleDateString('pt-BR')
        } catch {
            return data
        }
    }

    return (
        <main className={`MainAdminUpdate ${darkTheme ? "dark" : "light"}`}>
            <CabecalhoAdmin2 darkTheme={darkTheme} onChangeTheme={ChangeTheme} />
            
            <section className="cardUpdate">
                <div className="cardUpdate1">
                    <h1 className="titleUpdate">Inserir Atualização</h1>

                    <div className="informations">
                        <h2 className="subTitleUpdate">Titulo</h2>
                        <input type="text" placeholder="Modo Preto" />
                        <h2>Descrição</h2>
                        <input type="text"placeholder="Adicionado modo preto" />
                        <h2>Data/Prévia</h2>
                        <input type="date" />


                        {!loading && !error && updates.map((update) => (
                            <div className="date1" key={update.id}>
                                <h3 className="date">
                                    {formatarData(update.dataFormatada || update.DiadoUpdate)}
                                </h3>
                                <h4 className="text">{update.informacoes}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}