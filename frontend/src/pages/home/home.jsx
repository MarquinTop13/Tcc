import '../../scss/global.scss'
import '../../scss/fonts.scss'
import './home.scss'
import apiLink from '../../axios'
import Cabecalho from "../../components/headerHome"
import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import LinkWhiteMode from "/images/White/links_white1.png"
import LinkBlackMode from "/images/Black/link.png"
import PassToPassWhite from '/images/White/passo_a_passo_white1.png'
import PassToPassBlack from '/images/Black/passo-a-passo.png'
import ArchiveIcon from "/images/icons/iconarchive.png"
import MachineBlack from "/images/Black/machineBlack.png"
import Machine from "/images/White/machine.png"

import { Link } from "react-router"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(false);
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

    //Verificador de ADM - CORRIGIDO
    useEffect(() => {
        AdmVerificador();
    }, []); // Adicionei array de dependências vazio para executar apenas uma vez

    async function AdmVerificador() {
        try {
            const Token = localStorage.getItem('token');
            
            // Se não tem token, não faz requisição
            if (!Token) {
                console.log('Token não encontrado');
                return;
            }

            const response = await apiLink.post('/LoginADM', {
                'tokenInserido': Token
            });

            if (!response) {
                console.log('Resposta vazia');
                return;
            }

            const data = response.data || response;
            
            // Verifica se existe Usuario e se tem pelo menos um item
            if (!data.Usuario || !data.Usuario[0]) {
                console.log('Usuário não encontrado na resposta');
                return;
            }

            const usuario = data.Usuario[0];
            const nomeUsuario = usuario.nome;
            const emailUsuario = usuario.email;


            // CORREÇÃO: Condição correta para verificar admin
            if (
                (nomeUsuario === "MgsTop13" && emailUsuario === "mgs350084@gmail.com") ||
                (nomeUsuario === "Gustavo Max" && emailUsuario === "GUGU@gmx.com") ||
                nomeUsuario === "Vitu"
            ) {
                setUser(true);
                localStorage.setItem('User', nomeUsuario);
                localStorage.setItem('Email', emailUsuario);
            } else {
                setUser(false);
            }
        }
        catch (error) {
            console.log('Erro na verificação de admin: ' + error.message);
            setUser(false); // Garante que não seja admin em caso de erro
        }
    }

    return (
        <main className={`MainHome ${darkTheme ? "dark" : "light"}`}>
            <Cabecalho darkTheme={darkTheme} onChangeTheme={ChangeTheme} AdminVerify={user} />
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
                        link: "/Viruspage",
                        button: "Se Proteja",
                    },

                    {
                        id: 4,
                        icon: darkTheme ? MachineBlack : Machine,
                        title: "Gerador de senhas",
                        text: "Um simples gerador de senha com alta segurança",
                        link: "/PasswordGenerator",
                        button: "Gere sua senha",
                    }
                ].map(card => (
                    <div key={card.id} className={`card-${card.id} ${darkTheme ? "dark" : "light"}`}>
                        <div className={`titlecard-${card.id}`}>
                            <img src={card.icon} />
                            <h2>{card.title}</h2>
                        </div>
                        <p>{card.text}</p>
                        <div className="button-container">
                            <Link to={card.link}>
                                <button>{card.button}</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </section>
        </main>
    )
} 