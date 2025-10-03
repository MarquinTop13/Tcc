import "./header.scss"
import React, { useState, useEffect } from "react"
import BackgroundBlack from "/images/BackgroundBlack.png"
import BackgroundWhite from "/images/BackgroundWhite.png"


export default function Cabecalho() {
    const [darkTheme, setDarkTheme] = useState(false);

    function alterTheme() {
        if (darkTheme === false) {
            setDarkTheme(true)
        }
        else {
            setDarkTheme(false)
        }
    }

    useEffect(() => {
        if (darkTheme) {
            document.body.style.backgroundImage = `url(${BackgroundBlack})`
            document.body.style.color = "white"
        }
        else {
            document.body.style.backgroundImage = `url(${BackgroundWhite})`
            document.body.style.color = "black"
        }
    })

    return (
        <header>

            <section className="opcoes">
                <div className="column1">
                    <img src="../../../public/images/arrows.png" />
                    <h3 onClick={alterTheme}>Modo Escuro</h3>

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