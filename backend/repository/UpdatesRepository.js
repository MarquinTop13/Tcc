import {conexao} from "./conections.js"

export async function InserirUpdate(date, text){
    const command = `
        insert into Updates (DiadoUpdate, informacoes)
        values(?, ?);
    `

    const [info] = await conexao.query(command, [date, text]);
    return info;
}

export async function RemoverUpdate(id){
    const command = `
        delete from Updates
        where id = ?;
    `
    
    const [info] = await conexao.query(command, [id]);
    return info;
}

export async function ListarUpdates() {
    const command = `
        select 
            id,
            DATE_FORMAT(DiadoUpdate, '%d/%m/%Y') as dataFormatada,
            DiadoUpdate,
            informacoes
        from Updates
        order by DiadoUpdate DESC
    `;
    
    const [updates] = await conexao.query(command);
    return updates;
}