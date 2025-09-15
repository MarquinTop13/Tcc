import './home.scss'

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
        </main>
    )
}