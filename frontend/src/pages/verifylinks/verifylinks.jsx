import '../../scss/global.scss'
import '../../scss/fonts.scss'
import './verifylinks.scss'
import apiLink from '../../axios'
import Cabecalho2 from '../../components/HeaderPages'
import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import { useState, useEffect } from 'react'


export default function VerifyLinks() {
    const [darkTheme, setDarkTheme] = useState(true)
    const [link, SetLink] = useState('');
    const [resultado, SetResultado] = useState('');

    async function VerificarLinks() {
        try {
            const Verificando = await apiLink.post('/check-url', {
                "url": link
            });
            const dados = Verificando.data;
            if(dados.isSafe === true){
                SetResultado(`O site é seguro!`)
            }

            else{
                SetResultado('O site tem suspeitas de inseguranças')
            }
        }

        catch (error) {
            if (link === '') {
                alert('Insira um link!')
            }
            else {
                alert('Erro interno no servidor!\nCaso se o problema persistir envie uma mensagem ao Suporte!')
                console.log(`error: ${error}`)
            }

        }

    }

    //Modo simples para um if, else em react
    function ChangeTheme() {
        setDarkTheme(nomeAleatorio => !nomeAleatorio)
    }


    useEffect(() => {
        document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`
    }, [darkTheme]);
    return (
        <main className={`MainVerifyLinks ${darkTheme ? "dark" : "light"}`}>

            <Cabecalho2 darkTheme={darkTheme} onChangeTheme={ChangeTheme} />
            <section className="page-Links">
                <div className="card-Links">
                    <div className="part1-Links">
                        <h2>Verificador de Links</h2>
                        <input value={link} onChange={(e) => SetLink(e.target.value)} type="text" id="link" placeholder='https://sitealeatorio.com.br' />
                    </div>

                    <div className="part2-Links">
                        <h3>Resultado:</h3>
                        <pre className="resultado" id="resultado">
                            {resultado}
                        </pre>
                    </div>
                    <button onClick={VerificarLinks}>Verificar</button>
                </div>
            </section>
        </main>
    )
}