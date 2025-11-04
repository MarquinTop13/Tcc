import imgperf from "/images/icons/imagemPerfil.png";
import apiLink from "../../axios";
import { useState, useRef, useEffect } from "react";
import Modal from "../err/index";
import "./Perfil.scss";

export default function Perfil({ onClose, triggerRef }) {
  const [nome, setNome] = useState(localStorage.getItem('User'));
  const [dadosUser, setDadosUser] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState("sobre");
  const [codigoErro, setCodigoErro] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  // PegarDadosConta com tratamento de erro melhorado
  async function DadosConta() {
    try {
      const response = await apiLink.post('/InfoUser', { nome });
      const userData = response.data.buscarNome;
      setDadosUser(userData);
      
    } catch(error) {
      if (error.response) {
        console.error("Erro do servidor:", error.response.status, error.response.data);
        
        // Usa o modal em vez de alert
        const status = error.response.status;
        setCodigoErro(status);
        setShowModal(true);
        alert(status)
        
        if (codigoErro === 401 || status === 401) {
          setShowModal(true);
        }

        else if (codigoErro === 403 || status === 403) {
          setShowModal(true);
        }

        else if (codigoErro === 404 || status === 404) {
          setShowModal(true);
        }

        else if (codigoErro === 500 || status === 500) {
          setShowModal(true);
        }
      } 
    }
  }
 

  return (
    <div className="overlay-perfil" onClick={handleClickFora}>
      <main className="MainPerfil" ref={modalRef}>
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
              <div>
                <p>Idade: {}</p>
                <p>Data de criação: {dadosUser.idade || 'Não disponível'}</p>
              </div>
            ) : (
              <div>
                <p>Email: {dadosUser.email || 'Não disponível'}</p>
                <p>Palavra de Recuperação: {dadosUser.palavra}</p>
                <p>Senha Salva: {dadosUser.senhaGerada || 'Não salva'}</p>
              </div>
            )}
          </div>

          <div className="perfil-actions">
            <button className="btn-atualizar" onClick={DadosConta}>
              Atualizar Dados
            </button>
            <button className="btn-fechar" onClick={onClose}>Fechar</button>
          </div>
        </section>
      </main>

      {/* Modal de Erro */}
      <Modal 
        isOpen={showModal} 
        setModalOpen={() => setShowModal(!showModal)} 
        codigoErro={codigoErro} 
      />
    </div>
  );
}