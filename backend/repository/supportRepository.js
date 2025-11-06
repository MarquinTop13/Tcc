import {conexao} from "./conections.js"

export async function MensagemUser(idUser,msg, opcao){
    const mensagemUser = ` 
        insert into tb_support(idUser,msgUser, opcaoSelecionada)
            values(?,?,?)
    `
    
    const [info] = await conexao.query(mensagemUser, [idUser, msg, opcao]);
    return info.insertId;
}
export async function listarMensagens() {
    const [rows] = await conexao.query(`
      SELECT 
        s.id,
        s.idUser,
        c.nome,
        s.msgUser,
        s.opcaoSelecionada,
        s.status,
        s.created_at,
        c.fotoPerfil
      FROM tb_support s
      JOIN cadastro c ON s.idUser = c.id_cadastro
      ORDER BY s.created_at DESC
    `);
  
    return rows;
  }