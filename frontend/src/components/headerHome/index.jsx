import "./header.scss"
import React, { useEffect } from "react"
import { Link } from "react-router"
import BackgroundBlack from "/images/BackgroundBlack.png"
import BackgroundWhite from "/images/BackgroundWhite.png"
import arrowsWhite from "/images/arrowsWhite.png"
import arrows from "/images/arrows.png"

export default function Cabecalho({ darkTheme, onChangeTheme }) {

    useEffect(() => {
        const header = document.getElementById("header");
        const h3s = header.querySelectorAll("h3");

        if (darkTheme) {
            document.body.style.backgroundImage = `url(${BackgroundBlack})`;
            document.body.style.color = "white";
            header.style.background = "#112A43";
            h3s.forEach((h3) => (h3.style.color = "#FFFFFF"));
        } else {
            document.body.style.backgroundImage = `url(${BackgroundWhite})`;
            document.body.style.color = "black";
            header.style.background = "#6892C1";
            h3s.forEach((h3) => (h3.style.color = "#1E293B"));
        }
    }, [darkTheme]);

    return (
        <header id="header">
            <section className="opcoes">
                <div className="column1">
                    <img id="img" src={darkTheme ? arrowsWhite : arrows} />
                    <h3 id="h3" onClick={onChangeTheme}>
                        {darkTheme ? "Modo Claro" : "Modo Escuro"}
                    </h3>
                </div>

                <div className="column2">
                    <h3 id="h3">Suporte</h3>
                </div>

                <div className="column3">
                    <h3 id="h3">Atualizações</h3>
                    <h3 id="h3" className='h32'>Serviços</h3>
                </div>

                <div className="column4">
                    <h3 id="h3" ><Link id="h3" className="link" to={"/Login"}>Login</Link></h3>
                </div>
            </section>
        </header>
    )
}
