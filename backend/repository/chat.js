import { conexao } from "./conections.js";

export async function InserirMsg(userId ,Msg){
    const InsertMsg = `
        insert into Msg (mensagem, id_user)
            values
                (?,?);
    `

    const [info] = await conexao.query(InserirMsg, [Msg, userId]);
    return info.insertId;
}

export async function mostrarChat(){
    const ListeMsg = `
        select mensagem
            from Msg;
    `

    const [info] = await conexao.query(ListeMsg);
    return info;
}