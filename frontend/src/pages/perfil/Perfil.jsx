import imgperf from "/images/icons/imagemPerfil.png";
import apiLink from "../../axios";
import { useState, useRef, useEffect } from "react";
import "./Perfil.scss";

export default function Perfil({ onClose, triggerRef }) {
  const [nome,setNome] = useState(localStorage.getItem('User'));
  const [dadosUser, setDadosUser] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState("sobre");
  const modalRef = useRef(null);

  useEffect(() => {
    if (triggerRef.current && modalRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const modalRect = modalRef.current.getBoundingClientRect();
      
      // Posiciona à direita do ícone
      let left = triggerRect.right + 10;
      let top = triggerRect.top;
      
      // Ajusta se o modal sair da tela à direita
      if (left + modalRect.width > window.innerWidth) {
        left = triggerRect.left - modalRect.width - 1;
      }
      
      // Ajusta se o modal sair da tela na parte inferior
      if (top + modalRect.height > window.innerHeight) {
        top = window.innerHeight - modalRect.height - 10;
      }
      
      modalRef.current.style.left = `${left}px`;
      modalRef.current.style.top = `${top}px`;
    }
  }, [triggerRef]);

  const handleClickFora = (e) => {
    if (e.target.classList.contains("overlay-perfil")) {
      onClose();
    }
  };

  //PegarDadosConta:
  async function DadosConta(){
    try {
      const response = await apiLink.post('/InfoUser', { nome });
      const userData = response.data.buscarNome;
      setDadosUser(userData);
      
    } catch(error) {
      if (error.response) {
        // Erro do servidor (500, 404, etc.)
        console.error("Erro do servidor:", error.response.status, error.response.data);
        if (error.response.status === 500) {
          alert("Erro interno do servidor. Tente novamente mais tarde.");
        } else {
          alert(`Erro ${error.response.status}: ${error.response.data?.message || 'Erro na requisição'}`);
        }
      } else {
        alert(`Erro: ${error.message}`);
      }
    }
  }

  useEffect(() => {
    DadosConta()
  })

    

  return (
    <div className="overlay-perfil" onClick={handleClickFora}>
      <main onClick={DadosConta} className="MainPerfil" ref={modalRef}>
        <section className="imagem-abas">
          <div className="cabecalho-perfil">
            <img className="img-perfil" src={imgperf} height="130px" />
            <h1 className="apelido">{localStorage.getItem('User')}</h1>
          </div>

          <div className="perfil-abas">
            <button
              className={abaAtiva === "sobre" ? "ativo" : ""}
              onClick={() => setAbaAtiva("sobre")}
            >
              Sobre
            </button>
            <button
              className={abaAtiva === "sensiveis" ? "ativo" : ""}
              onClick={() => setAbaAtiva("sensiveis")}
            >
              Mais sobre sua conta
            </button>
          </div>

          <div className="perfil-info">
            {abaAtiva === "sobre" ? (
              <div onClick={DadosConta}>
                <p>Idade: 22</p>
                <p>Data de criação: {dadosUser.idade}</p>
              </div>
            ) : (
              <div>
                <p>Email: {dadosUser.email}</p>
                <p>Palavra de Recuperação: {dadosUser.palavra}</p>
                <p>Senha Salva: {dadosUser.senhaGerada}</p>
              </div>
            )}
          </div>

          <button className="btn-fechar" onClick={onClose}>Fechar</button>
        </section>
      </main>
    </div>
  );
}