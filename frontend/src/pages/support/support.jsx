import "./support.scss"
import Cabecalho2 from "../../components/HeaderPages"
import { Link } from "react-router"

export default function Support() {
    return (
        <main className='hub'>
            <Cabecalho2 />
            <section className='support-fundo'>
                <h1>Suporte</h1>
                <div className='container-support'>
                    <h2>O que trás aqui?</h2>
                    <div className='div-input'>
                        <input type="text" className='input-branco' />
                        <textarea className='text-black' name=""></textarea>
                    </div>
                    <button className='butao-verificated'>Verificar</button>
                    <Link to={"/virus"}>ir</Link>
                </div>
            </section>
        </main>
    )
}