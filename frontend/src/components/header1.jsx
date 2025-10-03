import "./header.scss"
import BackgroundBlack from "/images/BackgroundBlack.png"
import BackgroundWhite from "/images/BackgroundWhite.png"
export default function Cabecalho() {
    function DarkTheme(){
        let headerColor = document.getElementById("opcoes");
        headerColor = "blue"
    }
    

    return (
        <header>

            <section className="opcoes">
                <div className="column1">
                    <img src="../../../public/images/arrows.png" />
                    <button ><h3 id="Text">Modo Escuro</h3></button>

                </div>

                <div className="column2">
                    <h3>Suporte</h3>
                </div>

                <div className="column3">
                    <h3>Atualizações</h3>
                    <h3 className='h32'>Serviços</h3>
                </div>

                <div className="column4">
                    <h3>Registrar-se</h3>
                    <h3 className='h32'>Login</h3>

                </div>
            </section>
        </header>
    )
}