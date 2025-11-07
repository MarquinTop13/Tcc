// repository/UpdatesRepository.js
import { conexao } from "./conections.js";

export async function InserirUpdate(date, text) {
    const command = `
        INSERT INTO Updates (DiadoUpdate, informacoes)
        VALUES(?, ?)
    `;

    const [info] = await conexao.query(command, [date, text]);
    return info;
}

export async function RemoverUpdate(id) {
    const command = `
        DELETE FROM Updates
        WHERE id = ?
    `;
    
    const [info] = await conexao.query(command, [id]);
    return info;
}

export async function ListarUpdates() {
    const command = `
        SELECT 
            id,
            DATE_FORMAT(DiadoUpdate, '%d/%m/%Y') as dataFormatada,
            DiadoUpdate,
            informacoes
        FROM Updates
        ORDER BY DiadoUpdate DESC
    `;
    
    const [updates] = await conexao.query(command);
    return updates;
}