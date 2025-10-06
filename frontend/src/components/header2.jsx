import "./header.scss"
import { Link } from 'react-router';
import React, { useEffect, useState } from 'react';
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
            <img src="" alt="" />

            <section className="opcoes">
                <div className="column1">
                    <img src={darkTheme ? arrowsWhite : arrows} />
                    <h3 id="h3" onClick={onChangeTheme}>Modo Escuro</h3>
                </div>

                <div className="column2">
                    <h3 id="h3"><Link id="h3" className='link' to={'/'}>Voltar</Link></h3>
                </div>


            </section>
        </header>
    )
}