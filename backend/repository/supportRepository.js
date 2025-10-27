import {conexao} from "./conections.js"


export async function MensagemUser(idUser,msg){
    const mensagemUser = ` 
        insert into tb_suport(idUser,msgUser)
            values(?,?)
    `
    
    const [info] = await conexao.query(mensagemUser, [idUser, msg]);
    return info.insertId;
}

export async function SuportePronto(mensagem){
    const OpcaoSelecionada = `
        select msg from tb_support2
           where opcao = ?
    `
    
    const [info] = await conexao.query(OpcaoSelecionada, [mensagem]);
    return info;
}