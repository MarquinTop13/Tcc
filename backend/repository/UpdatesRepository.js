import {conexao} from "./conections.js"

export async function InserirUpdate(date, text){
    const command = `
        insert into Updates (DiadoUpdate,informacoes)
            values(?,?);
    `

    const [info] = await conexao.query(command,[date,text]);
    return info;
}

export async function RemoverUpdate(text){
    const command = `
        delete from Updates
            where informacoes = ?;
    `
}

export async function ListarUpdates() {
    const command = `
        select * from Updates
        order by DiadoUpdate ASC
    `
    const [updates] = await conexao.query(command);
    return updates
}