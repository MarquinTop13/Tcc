import Cabecalho2 from "../../components/HeaderPages"
import "./support.scss"
import apiLink from "../../axios.js" 
import { useState } from "react"

export default function Support() {
    const [opcaoEscolhida, setOpcaoEscolhida] = useState("a");
    const [msgUser, setmsgUser] = useState("b");
    
    
    async function sentMsg() {
        try{
            if(opcaoEscolhida === null || msgUser === ""){
                alert('Envie pelo menos uma opção ou mensagem!')
                return
            }

            else{
                const tokenUser = localStorage.getItem('token') 
                alert(tokenUser)
                const resposta = await apiLink.post('/UserHelp', {
                        "tokenInserido": tokenUser,
                        "msg": msgUser,
                        "opcao": opcaoEscolhida

                })
                }
            } catch(error){
                console.log("ERRO COMPLETO:", error)
                console.log("RESPOSTA DO SERVIDOR:", error.response?.data)
                alert(error.response?.data?.error || error.message)

        }

    }

    return (
        <main className='hub'>
            <Cabecalho2 />
            <section className='support-fundo'>
                <h1>Suporte</h1>
                <div className='container-support'>
                    <h2>O que trás aqui?</h2>
                    <div className='div-input'>
                        <label htmlFor="">Escolha uma opção</label>
                        <select name="valores" value={opcaoEscolhida} onChange={(e) => setOpcaoEscolhida(e.target.value)}>
                            <option value="0"></option>
                            <option value="1">Error</option>
                        </select>
                        <input 
                            type="text" 
                            className='input-branco' 
                            value={msgUser}
                            onChange={(e) => setmsgUser(e.target.value)}    
                        />
                    </div>
                    <button onClick={sentMsg} className='butao-verificated'>Verificar</button>
                </div>
            </section>
        </main>
    )
}