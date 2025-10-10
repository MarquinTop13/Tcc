import '../../scss/global.scss'
import '../../scss/fonts.scss'
import './home.scss'
import Cabecalho from "../../components/headerHome"
import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import IconWhiteMode from "/images/White/arrowsWhite.png"
import IconBlackMode from "/images/Black/arrows.png"
import LinkWhiteMode from "/images/White/links_white1.png"
import LinkBlackMode from "/images/Black/link.png"
import PassToPassWhite from '/images/White/passo_a_passo_white1.png'
import PassToPassBlack from '/images/Black/passo-a-passo.png'
import ArchiveIcon from "/images/iconarchive.png"


import { Link } from "react-router"
import { useEffect, useState } from 'react'

export default function Home() {

    const [darkTheme, setDarkTheme] = useState(true)

    //Modo simples para um if, else em react
    function ChangeTheme() {
        setDarkTheme(nomeAleatorio => !nomeAleatorio)
    }


    useEffect(() => {
        document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`
    }, [darkTheme]);

    return (
        <main className={`MainHome ${darkTheme ? "dark" : "light"}`}>
            <Cabecalho darkTheme={darkTheme} onChangeTheme={ChangeTheme} />

            <section className="text">
                <h1>Proteja seu dispositivo com um clique!</h1>
                <h3>Verifique arquivos e links que causem danos.</h3>
            </section>

            <section className="cards">
                {[
                    {
                        id: 1,
                        icon: ArchiveIcon,
                        title: "Verificador de Arquivos",
                        text: "Envie um arquivo e iremos verificar se causa danos!",
                        link: "/VerifyArchiver",
                        button: "Envie seu Arquivo!"
                    },

                    {
                        id: 2,
                        icon: darkTheme ? LinkWhiteMode : LinkBlackMode,
                        title: "Links Confiáveis",
                        text: "Envie um link para analise",
                        link: "/Verifylinks",
                        button: "Envie seu link",
                    },

                    {
                        id: 3,
                        icon: darkTheme ? PassToPassWhite : PassToPassBlack,
                        title: "Instuções para se previnir",
                        text: "Dicas de como se previnir de vírus perigosos",
                        link: "/", //Alguem Faz aí :(
                        button: "Se Proteja",
                    },

                    {
                        id: 4,
                        icon: "/images/machine.png",
                        title: "Gerador de senhas",
                        text: "Um simples gerador de senha com alta segurança",
                        link: "/", //Alguem faz ai tambem
                        button: "Gere sua senha",
                    }
                ].map(card => (
                    <div key={card.id} className={`card-${card.id} ${darkTheme ? "dark" : "light"}`}>
                        <div className={`titlecard-${card.id}`}>
                            <img src={card.icon} />
                            <h2>{card.title}</h2>
                        </div>
                        <p>{card.text}</p>
                        <Link to={card.link}>
                            <button>{card.button}</button>
                        </Link>
                    </div>
                ))}
            </section>
        </main>
    )
}
