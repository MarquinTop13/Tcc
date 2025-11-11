import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import Cabecalho2 from "../../components/HeaderPages"
import Mgs from "/images/icons/MgsPensativo.png"
import { useState, useEffect } from "react"
import "./update.scss"
import apiLink from "../../axios"

export default function Updates() {
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
        <main className={`MainUpdate ${darkTheme ? "dark" : "light"}`}>
            <Cabecalho2 darkTheme={darkTheme} onChangeTheme={ChangeTheme} />
            
            <section className="cardUpdate">
                <div className="cardUpdate1">
                    <h1 className="titleUpdate">Novidades e atualizações</h1>

                    <div className="informations">
                        <h2 className="subTitleUpdate">O que mudou?</h2>

                        {loading && (
                            <div className="loading">
                                <h4 className="text">Carregando atualizações...</h4>
                            </div>
                        )}

                        {error && (
                            <div className="error">
                                <h4 className="text" style={{color: 'red'}}>{error}</h4>
                                <button 
                                    onClick={carregarUpdates}
                                    style={{
                                        padding: '10px 20px',
                                        marginTop: '10px',
                                        backgroundColor: '#333366',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Tentar Novamente
                                </button>
                            </div>
                        )}

                        {!loading && !error && updates.length === 0 && (
                            <div className="empty">
                                <h4 className="text">Nenhuma atualização disponível</h4>
                            </div>
                        )}

                        {!loading && !error && updates.map((update) => (
                            <div className="date1" key={update.id}>
                                <h3 className="date">
                                    {formatarData(update.dataFormatada || update.DiadoUpdate)}
                                </h3>
                                <h4 className="text">{update.titulo}</h4>
                                <h5 className="text2">{update.descricao}</h5>
                            </div>
                        ))}
                    </div>
                    <img src={Mgs} className="Mgs" alt="MGS Pensativo"/>
                </div>
            </section>
        </main>
    )
}