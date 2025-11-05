import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import Cabecalho2 from "../../components/HeaderPages"
import { useState, useEffect } from "react"
import "./admin.scss"

export default function Admin() {

  //Modo escuro
  const [darkTheme, setDarkTheme] = useState(() => {
    const themeSaved = localStorage.getItem("TemaEscuro")
    return themeSaved ? themeSaved === "true" : false
  })

  function ChangeTheme() {
    setDarkTheme(prevTheme => !prevTheme)
  }

  useEffect(() => {
    document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`
  }, [darkTheme])

  useEffect(() => {
    localStorage.setItem("TemaEscuro", darkTheme.toString())
  }, [darkTheme])

  // Dados
  const [usuarios, setUsuarios] = useState([
    { id: 1, nome: "Gustavo", foto: "", duvida: "", resposta: "" },
    { id: 2, nome: "Marcos", foto: "", duvida: "", resposta: "" }
  ])

  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null)
  const [resposta, setResposta] = useState("")

  function enviarResposta() {
    if (!usuarioSelecionado) return
    if (!resposta.trim()) return
  
    const atualizados = usuarios.map(u =>
      u.id === usuarioSelecionado.id ? { ...u, resposta } : u
    )
  
    setUsuarios(atualizados)
    setUsuarioSelecionado(prev => ({ ...prev, resposta }))
    setResposta("")
  }
  

  return (
    <main className={`MainAdmin ${darkTheme ? "dark" : "light"}`}>
      <Cabecalho2 darkTheme={darkTheme} onChangeTheme={ChangeTheme} />

      <div className="MensagensMain">
        <div className="card">
          <h1 className="titulo">Mensagens</h1>

          <div className="container">

            <div className="col-esquerda">
              {usuarios.map((u) => (
                <div
                  key={u.id}
                  className={`usuario-item ${usuarioSelecionado?.id === u.id ? "ativo" : ""}`}
                  onClick={() => setUsuarioSelecionado(u)}
                >
                  <img src={u.foto} alt={u.nome} />
                  <span>{u.nome}</span>
                </div>
              ))}
            </div>

            <div className="col-direita">
                {usuarioSelecionado ? (
                    <>
                    <div className="mensagens-area">
                        <h2>{usuarioSelecionado.nome}</h2>
                        <p className="duvida">💬 {usuarioSelecionado.duvida}</p>

                        {usuarioSelecionado.resposta && (
                        <div className="resposta-enviada">
                            <strong>Resposta enviada:</strong>
                            <p>{usuarioSelecionado.resposta}</p>
                        </div>
                        )}
                    </div>

                    <div className="resposta-area">
                        <textarea
                        placeholder="Escreva sua resposta..."
                        value={resposta}
                        onChange={(e) => setResposta(e.target.value)}
                        />
                        <button onClick={enviarResposta}>Enviar resposta</button>
                    </div>
                    </>
                ) : (
                    <p>Selecione um usuário para responder</p>
                )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}