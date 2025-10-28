import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import Cabecalho2 from '../../components/HeaderPages/';
import React, { useState, useEffect } from "react";
import './password.scss';


export default function PasswordGenerator(){
    const [darkTheme, setDarkTheme] = useState(() => {
        const themeSaved = localStorage.getItem("TemaEscuro");
        return themeSaved ? themeSaved === 'true' : false;
    })
    //Mudar tema escuro para claro
    function ChangeTheme() {
        setDarkTheme(prevTheme => !prevTheme)
    }

    //Background mudando de acordo com o tema escolhido
    useEffect(() => {
        document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`
    }, [darkTheme]);

    //Setar o modo escuro no localStorage
    useEffect(() => {
        localStorage.setItem('TemaEscuro', darkTheme.toString())
    }, [darkTheme])

    return(
        <main>
            <Cabecalho2 />
            <h1>Gerador de Senhas!</h1>
        </main>
    )
}