import imgperf from "/images/icons/imagemPerfil.png";
import apiLink from "../../axios";
import { useState, useRef, useEffect} from "react";
import Modal from "../err/index";
import "./Perfil.scss";
import { useNavigate } from "react-router";

export default function Perfil({ onClose, triggerRef }) {
  const [nome, setNome] = useState(localStorage.getItem("User"));
  const [dadosUser, setDadosUser] = useState({});
  const [abaAtiva, setAbaAtiva] = useState("sobre");
  const [codigoErro, setCodigoErro] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (triggerRef.current && modalRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const modalRect = modalRef.current.getBoundingClientRect();
      
      let left = triggerRect.right + 10;
      let top = triggerRect.top;
      
      if (left + modalRect.width > window.innerWidth) {
        left = triggerRect.left - modalRect.width - 1;
      }
      
      if (top + modalRect.height > window.innerHeight) {
        top = window.innerHeight - modalRect.height - 10;
      }
      
      modalRef.current.style.left = `${left}px`;
      modalRef.current.style.top = `${top}px`;
    }
    
    DadosConta();
  }, [triggerRef]);
  
  const handleClickFora = (e) => {
    if (e.target.classList.contains("overlay-perfil")) {
      onClose();
    }
  };
  
  // Função para formatar a data
  const formatarData = (dataISO) => {
    if (!dataISO) return 'Não disponível';
    
    try {
      const data = new Date(dataISO);
      if (isNaN(data.getTime())) {
        return 'Data inválida';
      }
      return data.toLocaleDateString('pt-BR');
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Erro na data';
    }
  };

  // Função para calcular idade a partir da data de criação
  const calcularIdade = (dataCriacaoISO) => {
    if (!dataCriacaoISO) return 'Não disponível';
    
    try {
      const dataCriacao = new Date(dataCriacaoISO);
      const agora = new Date();
      
      if (isNaN(dataCriacao.getTime())) {
        return 'Data inválida';
      }
      
      const diffMs = agora - dataCriacao;
      const diffAnos = diffMs / (1000 * 60 * 60 * 24 * 365.25);
      
      return Math.floor(diffAnos) + ' anos';
    } catch (error) {
      console.error('Erro ao calcular idade:', error);
      return 'Erro no cálculo';
    }
  };
  
  // PegarDadosConta com tratamento de erro melhorado
  async function DadosConta() {
    try {
      const response = await apiLink.post('/InfoUser', { nome });
      const userData = response.data.buscarNome;
      const campoData = userData.idade
      
      // Formata os dados antes de salvar no state
      const userDataFormatado = {
        ...userData,
        dataCriacaoFormatada: formatarData(campoData),
        idadeConta: calcularIdade(campoData)
      };
      
      setDadosUser(userDataFormatado); 
    } catch(error) {
      if (error.response) {
        console.error("Erro do servidor:", error.response.status, error.response.data);
        
        const status = error.response.status;
        setCodigoErro(status);
        setShowModal(true);
      } else {
        console.error("Erro na requisição:", error);
      }
    }
  } 

  function Desconectar(){
    localStorage.removeItem("User");
    localStorage.removeItem("token");
    localStorage.removeItem("Email");
    navigate("/Login");
  }

  return (
    <div className="overlay-perfil" onClick={handleClickFora}>
      <main className="MainPerfil" ref={modalRef}>
        <section className="imagem-abas">
          <div className="cabecalho-perfil">
            <img className="img-perfil" src={imgperf} height="130px" alt="Perfil" />
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
              Mais...
            </button>
          </div>

          <div className="perfil-info">
            {abaAtiva === "sobre" ? (
              <div>
                <p>Idade: {dadosUser.idadeConta || 'Não disponível'}</p>
                <p>Data de criação: {dadosUser.dataCriacaoFormatada || 'Não disponível'}</p>
              </div>
            ) : (
              <div>
                <p>Email: {localStorage.getItem("Email") || 'Não disponível'}</p>
                <p>Palavra de Recuperação: {dadosUser.palavra || 'Não disponível'}</p>
                <p>Senha: {dadosUser.senhaGerada || 'Não disponível'}</p>
              </div>
            )}
          </div>

          <div className="perfil-actions">
            <button className="btn-fechar" onClick={onClose}>Fechar</button>
            <button className="btn-fechar" onClick={Desconectar}>Desconectar</button>
          </div>
        </section>
      </main>

      <Modal 
        isOpen={showModal} 
        setModalOpen={() => setShowModal(!showModal)} 
        codigoErro={codigoErro} 
      />
    </div>
  );
}