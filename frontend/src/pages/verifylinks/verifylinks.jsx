import '../../scss/global.scss'
import '../../scss/fonts.scss'
import './verifylinks.scss'
import { Link } from "react-router"

export default function VerifyLinks() {
    return (
        <main className="MainVerifyArchiver">
            <header className='HeaderVerifyArchiver'>
                <img src="" alt="" />

                <section className="opcoes">
                    <div className="column1">
                        <img src="/images/arrows.png" />
                        <h3>Modo Escuro</h3>
                    </div>

                    <div className="column2">
                        <h3><Link className='link' to={'/'}>Voltar</Link></h3>
                    </div>


                </section>
            </header>
            <section className="page">
                <div className="card">
                    <div className="part1">
                        <h2>Verificador de arquivos</h2>
                        <input type="file" id="arquivo" />

                    </div>

                    <div className="part2">
                        <h3>Resultado:</h3>
                        <pre className="resultado" id="resultado"></pre>
                    </div>
                    <button onClick={verificar}>Verificar</button>
                </div>
            </section>
        </main>
    )
}