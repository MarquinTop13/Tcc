import imgE from "/images/icone_erro.png";
import imgM from "/images/mascoteG404.png";
import "./erro.scss";

export default function Err({ isOpen, onClose }){
    if(!isOpen) return null;

    return(
      <main className="MainErr">
        <section className="fundo-err">
          <div className="conteiner-err">
            <div className="err-imgs">
              <img className="error-img" src={imgE} height="70px" />
              <img className="masacote" src={imgM} height="70px" />
            </div>
            <div className="err-text">
              <p className="pp"><span className="dd"> Erro 404</span>: Busca ou teste <span className="dd"> não encontrado! </span><br /> Tente novamente ou volte a página inicial.</p>
            </div>
          </div>
        </section>
      </main>
    )
}