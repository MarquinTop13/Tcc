import "./index.scss"
import { Link } from 'react-router';
import React, { useEffect, useState } from 'react';
import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import brightness from "/images/Black/brightness.png"
import brightnessWhite from "/images/White/brightnessWhite.png"

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
            <img className="logo" src="/images/Logo-removebg-preview.png" />

            <section className="opcoes">
                <nav className="column1">
                    <img src={darkTheme ? brightnessWhite : brightness} />
                    <h3 id="h3" onClick={onChangeTheme}>Modo Escuro</h3>
                </nav>

                <nav className="column2">
                    <h3 id="h3"><Link id="h3" className='link' to={'/'}>Voltar</Link></h3>
                </nav>


            </section>
        </header>
    )
}