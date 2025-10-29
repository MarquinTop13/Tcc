import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import Cabecalho2 from "../../components/HeaderPages"
import { useState, useEffect } from "react";
import './admin.scss'

export default function Admin() {
     //Modo escuro:
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
    
    return (
        <main className={`MainAdmin ${darkTheme ? "dark" : "light"}`}>
            <Cabecalho2 darkTheme={darkTheme} onChangeTheme={ChangeTheme} />

            <h1>Admin Page!</h1>
            <p>Welcome {localStorage.getItem('Admin')}</p>
        </main>
    )
}