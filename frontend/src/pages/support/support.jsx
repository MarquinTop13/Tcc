import Cabecalho2 from "../../components/HeaderPages"
import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import "./support.scss"
import apiLink from "../../axios.js" 
import { useState, useEffect } from "react"
import { Link } from "react-router"

export default function Support() {
    const [opcaoEscolhida, setOpcaoEscolhida] = useState("");
    const [msgUser, setMsgUser] = useState("");
    const [darkTheme, setDarkTheme] = useState(() => {
        const themeSaved = localStorage.getItem("TemaEscuro");
        return themeSaved ? themeSaved === 'true' : false;
    })

    // Mudar tema escuro para claro
    function ChangeTheme() {
        setDarkTheme(prevTheme => !prevTheme)
    }

    // Background mudando de acordo com o tema escolhido
    useEffect(() => {
        document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`
    }, [darkTheme]);

    // Setar o modo escuro no localStorage
    useEffect(() => {
        localStorage.setItem('TemaEscuro', darkTheme.toString())
    }, [darkTheme])
    
    
    async function sentMsg() {
        try{
            if(opcaoEscolhida === "" && msgUser === ""){
                alert('Envie pelo menos uma opção ou mensagem!')
                return
            }

            const tokenUser = localStorage.getItem('token');
            const resposta = await apiLink.post('/UserHelp', {
                "tokenInserido": tokenUser,
                "msg": msgUser,
                "opcao": opcaoEscolhida
            });
            
            alert("Mensagem enviada!");
            // Limpar os campos após envio
            setOpcaoEscolhida("");
            setMsgUser("");
            
        } catch(error){
            console.log("ERRO COMPLETO:", error);
            if(error.message === "Network Error"){
                alert( "Falha no servidor, envie mensagem ao gmail ou no instagram!");
            }
        }
    }
    useEffect(() => {
        function handleKeyDown(event) {
          if (event.key === "Enter") {
            sentMsg();
          }
        }
    
        window.addEventListener("keydown", handleKeyDown);
    
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
        };
      },);

    return (
        <main className={`MainSupport ${darkTheme ? "dark" : "light"}`}>
            <Cabecalho2 darkTheme={darkTheme} onChangeTheme={ChangeTheme}/>
            <section className='support-fundo'>
                <div className='container-support'>
                    <h1 className="titleSupport">Suporte</h1>
                    <h2>O que te trás aqui?</h2>
                    <div className='div-input'>

                        <label>Escolha uma opção</label>

                        <select name="valores" value={opcaoEscolhida} onChange={(e) => setOpcaoEscolhida(e.target.value)}>
                            <option value=""></option>
                            <option value="Error">Error</option>
                            <option value="Dúvida">Dúvida</option>
                            <option value="Sugestão">Sugestão</option>
                            <option value="Outro">Outro</option>
                        </select>
                        
                        <div className="separator">
                            <span>Não encontrou nenhum motivo? Escreva sua mensagem aqui</span>
                        </div>
                        
                        <textarea 
                            className='text-area-custom' 
                            value={msgUser}
                            onChange={(e) => setMsgUser(e.target.value)}
                            placeholder="Escreva sua mensagem aqui..."
                        />  

                    </div>
                    <button onClick={sentMsg} className='butao-verificated'>Enviar</button>
                    <Link to={'/UserSupport'} className="link-mensagens">Ver minhas mensagens</Link>
                </div>
            </section>
        </main>
    )
}