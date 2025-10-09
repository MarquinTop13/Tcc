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
        console.log(`Agora: ${darkTheme}`)
        setDarkTheme(nomeAleatorio => !nomeAleatorio)
    }

    //FAZER ISSO UM POUCO MAIS LEVE, EXEMPLO:
    /*
        useEffect(() => {
            document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`
        }, [darkTheme])

        id: 1,
            icon: ArchiveIcon,
            title: "Verificador de arquivos",
            text: "Envie um arquivo e iremos verificar se causa danos!",
            link: "/VerifyArchiver",
            button: "Verifique Agora!"
    */

    //Renderiza o React, caso seja claro mude para escuro Vise-versa
    useEffect(() => {
        //Caso a variavel "darkTheme = true" ele muda o tema para escuro
        if(darkTheme){
            document.body.style.color = "#FFFFFF"
            document.body.style.backgroundImage = `url(${BackgroundBlack})`;
            document.getElementById('textcard').style.color = "#D1D5DB";
            document.getElementById('textcard2').style.color = "#D1D5DB";
            document.getElementById('textcard3').style.color = "#D1D5DB";
            document.getElementById('textcard4').style.color = "#D1D5DB";
            document.getElementById('card1').style.backgroundColor = "#112A43";
            document.getElementById('card2').style.backgroundColor = "#112A43";
            document.getElementById('card3').style.backgroundColor = "#112A43";
            document.getElementById('card4').style.backgroundColor = "#112A43";
            document.getElementById('button1').style.backgroundColor = "#0040FF";
        }
        //Senão, ele deixa a variavel "darkTheme = false" e deixa o tema para o modo claro
        else{
            document.body.style.color = "#000"
            document.body.style.backgroundImage = `url(${BackgroundWhite})`;
            document.getElementById('textcard').style.color = "#333333";
            document.getElementById('textcard2').style.color = "#333333";
            document.getElementById('textcard3').style.color = "#333333";
            document.getElementById('textcard4').style.color = "#333333";
            document.getElementById('card1').style.backgroundColor = "#ced4dac1";
            document.getElementById('card2').style.backgroundColor = "#ced4dac1";
            document.getElementById('card3').style.backgroundColor = "#ced4dac1";
            document.getElementById('card4').style.backgroundColor = "#ced4dac1";
        }   
    }), [darkTheme];

    return (
        <main className={`MainHome ${darkTheme ? "dark" : "light"}`}>
            <Cabecalho darkTheme={darkTheme} onChangeTheme={ChangeTheme} />

            <section className="text">
                <h1>Proteja seu dispositivo com um clique!</h1>
                <h3>Verifique arquivos e links que causem danos.</h3>
            </section>

            <section className="cards">
                <div id='card1'>
                    <div className="titlecard">
                        <img src={ArchiveIcon} />
                        <h2>Verificador de arquivos</h2>
                    </div>
                    <div id="textcard">
                        <p>Envie um arquivo e iremos verificar se causa danos!</p>
                    </div>
                    <Link to={"/VerifyArchiver"}>
                        <button id='button1'>Verifique Agora!</button>
                    </Link>
                </div>

                <div id='card2'>
                    <div className="titlecard2">
                        <img src={darkTheme ? LinkWhiteMode : LinkBlackMode} />
                        <h2>Verificador de link</h2>
                    </div>
                    <div id="textcard2">
                        <p>Envie um link e iremos verificar se causa danos!</p>
                    </div>
                    <Link to={"/VerifyArchiver"}>
                        <button id='button2'>Envie o link aqui</button>
                    </Link>
                </div>

                <div id='card3'>
                    <div className="titlecard3">
                        <img src={darkTheme ? PassToPassWhite : PassToPassBlack} />
                        <h2>Instruções para se previnir</h2>
                    </div>
                    <div id="textcard3">
                        <p>Ensinaremos um passo a passo de como se manter seguro</p>
                    </div>
                    <Link to={"/VerifyArchiver"}>
                        <button id='button3'>Veja!</button>
                    </Link>
                </div>

                <div id='card4'>
                    <div className="titlecard4">
                        <img src="/images/machine.png" />
                        <h2>Gerador de senhas</h2>
                    </div>
                    <div id="textcard4">
                        <p>Gerar senhas com muita segurança</p>
                    </div>
                    <Link to={"/VerifyArchiver"}>
                        <button id='button4'>Gere sua senha!</button>
                    </Link>
                </div>
            </section>
        </main>
    )
}
