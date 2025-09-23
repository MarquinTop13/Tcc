import '../../scss/global.scss'
import '../../scss/fonts.scss'
import './home.scss'
import { Link } from "react-router"

export default function Home() {
    return (
        <main className='MainHome'>
            <header className='HeaderMain'>
                <img src="" alt="" />

                <section className="opcoes">
                    <div className="column1">
                        <img src="../../../public/images/arrows.png" />
                        <h3>Modo Escuro</h3>
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

            <section className="text">
                <h1>Proteja seu dispositivo com um clique!</h1>
                <h3>Verifique arquivos e links que causem danos.</h3>
            </section>

            <section className="cards">
                <div className='card1'>
                    <div className="titlecard">
                        <img src="../../../public/images/arquivo (1) 1.png" />
                        <h2>Verificador de arquivos</h2>
                    </div>
                    <div className="textcard">
                        <p>Envie um arquivo e iremos verificar se causa danos!</p>
                    </div>
                    <Link to={"/VerifyArchiver"}>
                        <button>Verifique Agora!</button>
                    </Link>

                </div>

                <div className='card2'>
                <div className="titlecard2">
                        <img src="../../../public/images/links 1.png" />
                        <h2>Verificador de link</h2>
                    </div>
                    <div className="textcard2">
                        <p>Envie um link e iremos verificar se causa danos!</p>
                    </div>
                    <Link to={"/VerifyArchiver"}>
                        <button>Envie o link aqui</button>
                    </Link>
                </div>

                <div className='card3'>
                <div className="titlecard3">
                        <img src="../../../public/images/passo-a-passo 1.png" />
                        <h2>Instruções para se previnir</h2>
                    </div>
                    <div className="textcard3">
                        <p>Ensinaremos um passo a passo de como se manter seguro</p>
                    </div>
                    <Link to={"/VerifyArchiver"}>
                        <button>Veja!</button>
                    </Link>
                </div>

                <div className='card4'>
                <div className="titlecard4">
                        <img src="../../../public/images/passo-a-passo 1.png" />
                        <h2>Gerador de senhas</h2>
                    </div>
                    <div className="textcard3">
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