import apiLink from "../../../axios.js"
import { useState } from "react";
import axios from "axios";

export default function AddVirus() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prevensao, setPrevensao] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiLink.post("/api/virus", {
      nome_virus: nome,
      descricao_virus: descricao,
      prevensao: prevensao
    });
    alert("Vírus adicionado com sucesso!");
    setNome(""); setDescricao(""); setPrevensao("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-virus-form">
      <input placeholder="Nome do vírus" value={nome} onChange={e => setNome(e.target.value)} />
      <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
      <input placeholder="Prevenção" value={prevensao} onChange={e => setPrevensao(e.target.value)} />
      <button type="submit">Adicionar</button>
    </form>
  );
}
