import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import Cabecalho2 from "../../components/HeaderPages"
import Mgs from "/images/icons/MgsPensativo.png"
import { useState, useEffect } from "react"
import "./update.scss"


export default function Updates() {
    // Modo escuro
        const [darkTheme, setDarkTheme] = useState(() => {
            const themeSaved = localStorage.getItem("TemaEscuro")
            return themeSaved ? themeSaved === "true" : false
        })

        function ChangeTheme() {
            setDarkTheme(prevTheme => !prevTheme)
        }

        useEffect(() => {
            document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`
        }, [darkTheme])

        useEffect(() => {
            localStorage.setItem("TemaEscuro", darkTheme.toString())
        }, [darkTheme])

    return (
        <main className={`MainUpdate ${darkTheme ? "dark" : "light"}`}>
            <Cabecalho2 darkTheme={darkTheme} onChangeTheme={ChangeTheme} />
            
            <section className="cardUpdate">
                <div className="cardUpdate1">
                    <h1 className="titleUpdate">Novidades e atualizações</h1>

                    <div className="informations">
                        <h2 className="subTitleUpdate">O que mudou?</h2>


                        <div className="date1">
                            <h3 className="date">27/05/2025</h3>
                            <h4 className="text">Modo preto kk</h4>
                        </div>

                        <div className="date1">
                            <h3 className="date">27/05/2024</h3>
                            <h4 className="text">Modo mobile kk</h4>
                        </div>

                        <div className="date1">
                            <h3 className="date">27/05/2025</h3>
                            <h4 className="text">Modo preto kk</h4>
                        </div>

                        <div className="date1">
                            <h3 className="date">27/05/2024</h3>
                            <h4 className="text">Modo mobile kk</h4>
                        </div>
                    </div>
                    <img src={Mgs} className="Mgs"/>
                </div>
            </section>
        </main>
    )
}