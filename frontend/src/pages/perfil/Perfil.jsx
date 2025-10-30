import imgperf from "/images/icons/imagemPerfil.png";
import { useState } from "react";
import "./Perfil.scss";

export default function Perfil({ onClose }) {
  const [abaAtiva, setAbaAtiva] = useState("sobre");

  // Fechar modal ao clicar fora
  const handleClickFora = (e) => {
    if (e.target.classList.contains("overlay-perfil")) {
      onClose();
    }
  };

  return (
    <div className="overlay-perfil" onClick={handleClickFora}>
      <main className="MainPerfil">
        <section className="imagem-abas">
          <div className="cabecalho-perfil">
            <img className="img-perfil" src={imgperf} height="130px" />
            <h1 className="apelido">Sergio</h1>
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
                <p>Data de criação: 20/10/2024</p>
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
