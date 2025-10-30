import imgperf from "/images/icons/imagemPerfil.png";
import apiLink from "../../axios";
import { useState, useRef, useEffect } from "react";
import "./Perfil.scss";

export default function Perfil({ onClose, triggerRef }) {
  const [nomeUser,setNomeUser] = useState(localStorage.getItem('Admin'));
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
      try{
        const informacoesUser = apiLink.post('/InfoUser',{
          nome: nomeUser
      })
      } catch(error){
        alert(error.response);
      }

    }

    

  return (
    <div className="overlay-perfil" onClick={handleClickFora}>
      <main className="MainPerfil" ref={modalRef}>
        <section className="imagem-abas">
          <div className="cabecalho-perfil">
            <img className="img-perfil" src={imgperf} height="130px" />
            <h1 className="apelido">{localStorage.getItem('Admin')}</h1>
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
                <p>Idade: 22</p>
                <p>Data de criação: {informacoesUser}</p>
              </div>
            ) : (
              <div>
                <p>Email: {}</p>
                <p>Senha: {}</p>
              </div>
            )}
          </div>

          <button className="btn-fechar" onClick={onClose}>Fechar</button>
        </section>
      </main>
    </div>
  );
}