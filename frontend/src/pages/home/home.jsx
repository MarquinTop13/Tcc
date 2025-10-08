import '../../scss/global.scss'
import '../../scss/fonts.scss'
import './home.scss'
import Cabecalho from "../../components/headerHome"
import { Link } from "react-router"
import { useEffect, useState } from 'react'

export default function Home() {

    const [darkTheme, setDarkTheme] = useState(false)

    function ChangeTheme() {
        setDarkTheme(prev => !prev)
    }

    useEffect(() => {
        if(darkTheme){
            document.getElementById('textcard').style.color = "#D1D5DB";
            document.getElementById('textcard2').style.color = "#D1D5DB";
            document.getElementById('textcard3').style.color = "#D1D5DB";
            document.getElementById('textcard4').style.color = "#D1D5DB";
            document.getElementById('card1').style.backgroundColor = "#112A43";
            document.getElementById('card2').style.backgroundColor = "#112A43";
            document.getElementById('card3').style.backgroundColor = "#112A43";
            document.getElementById('card4').style.backgroundColor = "#112A43";
        }
        else{
            document.getElementById('textcard').style.color = "#333333";
            document.getElementById('textcard2').style.color = "#333333";
            document.getElementById('textcard3').style.color = "#333333";
            document.getElementById('textcard4').style.color = "#333333";
            document.getElementById('card1').style.backgroundColor = "#ced4dac1";
            document.getElementById('card2').style.backgroundColor = "#ced4dac1";
            document.getElementById('card3').style.backgroundColor = "#ced4dac1";
            document.getElementById('card4').style.backgroundColor = "#ced4dac1";
        }   
    })

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
                        <img src="/images/iconarchive.png" />
                        <h2>Verificador de arquivos</h2>
                    </div>
                    <div id="textcard">
                        <p>Envie um arquivo e iremos verificar se causa danos!</p>
                    </div>
                    <Link to={"/VerifyArchiver"}>
                        <button>Verifique Agora!</button>
                    </Link>
                </div>

                <div id='card2'>
                    <div className="titlecard2">
                        <img src="/images/link.png" />
                        <h2>Verificador de link</h2>
                    </div>
                    <div id="textcard2">
                        <p>Envie um link e iremos verificar se causa danos!</p>
                    </div>
                    <Link to={"/VerifyArchiver"}>
                        <button>Envie o link aqui</button>
                    </Link>
                </div>

                <div id='card3'>
                    <div className="titlecard3">
                        <img src="/images/passo-a-passo.png" />
                        <h2>Instruções para se previnir</h2>
                    </div>
                    <div id="textcard3">
                        <p>Ensinaremos um passo a passo de como se manter seguro</p>
                    </div>
                    <Link to={"/VerifyArchiver"}>
                        <button>Veja!</button>
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
                        <button>Gere sua senha!</button>
                    </Link>
                </div>
            </section>
        </main>
    )
}
