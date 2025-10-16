import "./index.scss"
import { Link } from 'react-router';
import React, { useEffect, useState } from 'react';
import Logo from "/images/Logo-removebg-preview.png";
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
            document.getElementById('link').style.color = '#FFFFFF'
            header.style.background = "#112A43";
            h3s.forEach((h3) => (h3.style.color = "#FFFFFF"));
            
            
            

        } 
            
         else {
            document.body.style.backgroundImage = `url(${BackgroundWhite})`;
            header.style.background = "#6892c198";
            document.getElementById('link').style.color = '#1E293B'
            document.body.style.color = "black";
            document.getElementById('link').style.color = '#1E293B'
        }
    }, [darkTheme]);

    return (
        <header id="header" className={`header-pages ${darkTheme ? "dark": "light"}`}>
            <img className="logo" src={Logo} />

            <section className="opcoes">
                <nav className="column1">
                    <img src={darkTheme ? brightnessWhite : brightness} />
                    <h3 id="h3" onClick={onChangeTheme}>Modo Escuro</h3>
                </nav>

                <nav className="column2">
                    <h3 id="h3"><Link id="link" className='link' to={'/'}>Voltar</Link></h3>
                </nav>


            </section>
        </header>
    )
}