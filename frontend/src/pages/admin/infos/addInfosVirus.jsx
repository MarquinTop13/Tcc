import Cabecalho2 from "../../../components/HeaderPages/index.jsx";
import BackgroundBlack from "/images/Black/BackgroundBlack.png";
import BackgroundWhite from "/images/White/BackgroundWhite.png";
import apiLink from "../../../axios.js";
import { useState, useEffect } from "react";
import "./addInfosVirus.scss";

export default function AddVirus() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prevensao, setPrevensao] = useState("");
  const [virusList, setVirusList] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [darkTheme, setDarkTheme] = useState(() => {
    const themeSaved = localStorage.getItem("TemaEscuro");
    return themeSaved ? themeSaved === "true" : false;
  });
  function ChangeTheme() {
    setDarkTheme((prevTheme) => !prevTheme);
  }
  useEffect(() => {
    document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`;
  }, [darkTheme]);

  useEffect(() => {
    localStorage.setItem("TemaEscuro", darkTheme.toString());
  }, [darkTheme]);

  async function fetchVirus() {
    setLoading(true);
    try {
      const res = await apiLink.get("/api/listarInf");
      setVirusList(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Erro ao buscar vírus:", error);
      setVirusList([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVirus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome.trim()) return alert("Digite o título do vírus.");
    try {
      await apiLink.post("/api/virus", {
        nome_virus: nome,
        descricao_virus: descricao,
        prevensao: prevensao,
      });
      alert("Vírus adicionado com sucesso!");
      setNome("");
      setDescricao("");
      setPrevensao("");
      await fetchVirus();
    } catch (error) {
      console.error("Erro ao adicionar vírus:", error);
      alert("Erro ao adicionar vírus.");
    }
  };

  const handleDelete = async () => {
    if (!selectedId) return alert("Selecione um vírus primeiro!");
    if (!window.confirm("Tem certeza que deseja apagar este vírus?")) return;

    const previous = [...virusList];
    setVirusList((prev) => prev.filter((v) => v.id !== selectedId));
    setSelectedId(null);

    try {
      await apiLink.delete(`/api/virus/${selectedId}`);
      alert("Vírus removido com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar vírus:", error);
      alert("Erro ao apagar o vírus — restaurando lista.");
      setVirusList(previous); 
    }
  };

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Enter") {
        handleDelete();
      }
    }
  
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);
  

  return (
    <main className={`MainCadastro ${darkTheme ? "dark" : "light"}`}>
      <Cabecalho2 darkTheme={darkTheme} onChangeTheme={ChangeTheme} />
      <div className="criar-container">
        <div className="card-criar">
          <h2>Criar Card</h2>

          <form className="input-btn" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Digite o título"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <button type="submit">Publicar</button>
          </form>

          <textarea
            placeholder="Digite a descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          ></textarea>

          <textarea
            placeholder="Digite a prevenção"
            value={prevensao}
            onChange={(e) => setPrevensao(e.target.value)}
          ></textarea>
        </div>

        <div className="virus-list-container">
          <h3>Vírus adicionados</h3>
          <div className="virus-list">
            {loading ? (
              <p>Carregando...</p>
            ) : virusList.length === 0 ? (
              <p>Nenhum vírus cadastrado ainda.</p>
            ) : (
              virusList.map((virus) => (
                <div
                  key={virus.id}
                  className={`virus-item ${selectedId === virus.id ? "selected" : ""}`}
                  onClick={() => setSelectedId(selectedId === virus.id ? null : virus.id)}
                >
                  <strong>{virus.nome_virus}</strong>
                  <p>{virus.descricao_virus}</p>
                </div>
              ))
            )}
          </div>

          <button className="delete-btn" onClick={handleDelete} disabled={!selectedId}>
            Apagar Selecionado
          </button>
        </div>
      </div>
    </main>
  );
}
