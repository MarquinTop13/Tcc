import "./index.scss";
import { useState } from "react";
import { Link } from "react-router";
import Logo from "/images/logod.png";
import brightness from "/images/Black/brightness.png";
import brightnessWhite from "/images/White/brightnessWhite.png";

export default function Cabecalho({ darkTheme, onChangeTheme }) {
    const [img90Dg, setImg90Dg] = useState(false)
    function MoverImg(){
        if(img90Dg === false){
            document.getElementById('imgsun').style.transform = 'rotate(120deg)';
            setImg90Dg(true);
        }
        else{
            document.getElementById('imgsun').style.transform = 'rotate(-25deg)';
            setImg90Dg(false)
        }
    }

    return (
        <header className={`header-home ${darkTheme ? "dark" : "light"}`}>
            <img src={Logo} className="logo" alt="Logo" />

            <section className="opcoes">
            <div onClick={() => { onChangeTheme(); MoverImg(); }} className="column1">
                    <img
                        id="imgsun"
                        src={darkTheme ? brightnessWhite : brightness}
                        alt="Trocar tema"
                    />
                    <h3>{darkTheme ? "Modo Claro" : "Modo Escuro"}</h3>
                </div>
                <div className="column2">
                    <h3>Suporte</h3>
                </div>

                <div className="column3">
                    <h3>Atualizações</h3>
                    <h3 className="h32">Serviços</h3>
                </div>

                <div className="column4">
                    <Link className="link" to="/Login">
                        Login
                    </Link>
                </div>
            </section>
        </header>
    );
}
