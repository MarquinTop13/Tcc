import Cabecalho2 from "../../components/HeaderPages"
import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import "./support.scss"
import apiLink from "../../axios.js" 
import { useState, useEffect } from "react"

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
            alert(error.response?.data?.error || error.message || "Erro ao enviar mensagem");
        }
    }

    return (
        <main className='hub'>
            <Cabecalho2 darkTheme={darkTheme} onChangeTheme={ChangeTheme}/>
            <section className='support-fundo'>
                <div className='container-support'>
                    <h1 className="titleSupport">Suporte</h1>
                    <h2>O que te trás aqui?</h2>
                    <div className='div-input'>
                        <label>Escolha uma opção</label>
                        <select name="valores" value={opcaoEscolhida} onChange={(e) => setOpcaoEscolhida(e.target.value)}>
                            <option value=""></option>
                            <option value="1">Error</option>
                            <option value="2">Bug</option>
                            <option value="3">Dúvida</option>
                            <option value="4">Sugestão</option>
                            <option value="5">Outro</option>
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
                    <button onClick={sentMsg} className='butao-verificated'>Verificar</button>
                </div>
            </section>
        </main>
    )
}