import {conexao} from "./conections.js"

export async function MensagemUser(idUser,msg, opcao){
    const mensagemUser = ` 
        insert into tb_support(idUser,msgUser, opcaoSelecionada)
            values(?,?,?)
    `
    
    const [info] = await conexao.query(mensagemUser, [idUser, msg, opcao]);
    return info.insertId;
}