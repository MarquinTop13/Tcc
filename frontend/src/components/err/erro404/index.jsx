import imgE from "/images/icons/icone_erro.png";
import imgM from "/images/icons/mascoteG404.png";
import Cabo from "/images/icons/cabos.png";
import "./erro404.scss";

export default function Err({ isOpen, setModalOpen, children }) {
  if (!isOpen) return null;

  function fechamento(e){
    if(e.target.classList.contains("MainErr")){
      setModalOpen();
    }
  }

  return (
    <main className="MainErr" onClick={fechamento}>
      <section className="fundo-err">
        <div className="conteiner-err">
          <div className="err-imgs">
            <img className="error-img" src={imgE} height="70px" />
            <img className="masacote" src={imgM} height="70px" />
          </div>
          <div className="err-text">
            <p className="pp">
              <span className="dd">Erro 404</span>: Busca ou teste{" "}
              <span className="dd">não encontrado!</span>
              <br />
              Tente novamente ou volte para a página inicial.
            </p>
            <img src={Cabo} height="50px" />
          </div>
        </div>
      </section>
    </main>
  );
}