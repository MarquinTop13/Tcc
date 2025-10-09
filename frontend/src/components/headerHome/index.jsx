import "./index.scss"
import React, { useEffect } from "react"
import { Link } from "react-router"
import arrowsWhite from "/images/White/arrowsWhite.png"
import arrows from "/images/Black/arrows.png"

export default function Cabecalho({ darkTheme, onChangeTheme }) {

    useEffect(() => {
        const header = document.getElementById("header-home");
        const h3s = header.querySelectorAll("h3");

        if (darkTheme) {
            document.getElementById('link').style.color = '#FFFFFF'
            header.style.background = "#112A43";
            h3s.forEach((h3) => (h3.style.color = "#FFFFFF"));
        } else {
            header.style.background = "#6892C1";
            document.getElementById('link').style.color = '#1E293B'
            h3s.forEach((h3) => (h3.style.color = "#1E293B"));
        }
    }, [darkTheme]);

    return (
        <header id="header-home">
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
                    <h3 id="h3" ><Link id="link" to={"/Login"}>Login</Link></h3>
                </div>
            </section>
        </header>
    )
}
