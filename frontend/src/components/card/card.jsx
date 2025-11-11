import React from "react";
import "./card.scss";

export default function CardPublicacao({ nome, descricao, prevensao }) {
    return (
      <div className="virus-card">
        <header className="card-header">
          <h2>{nome || "Sem título"}</h2>
          <p>{descricao || "Sem descrição"}</p>
        </header>
  
        <footer className="card-footer">
          <h3>Como se prevenir</h3>
          <p>{prevensao || "Sem prevenção"}</p>
        </footer>
      </div>
    );
  }