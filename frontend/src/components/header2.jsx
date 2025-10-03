import { Link } from 'react-router';
import "./header.scss"

export default function Cabecalho2() {
    return (
        <header>
            <img src="" alt="" />

            <section className="opcoes">
                <div className="column1">
                    <img src="../../../public/images/arrows.png" />
                    <h3>Modo Escuro</h3>
                </div>

                <div className="column2">
                    <h3><Link className='link' to={'/'}>Voltar</Link></h3>
                </div>


            </section>
        </header>
    )
}