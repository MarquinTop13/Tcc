import {conexao} from "./conections.js";

export async function listarMensagens() {
  const sql = `
    select s.id, s.idUser, u.nome, s.msgUser, s.opcaoSelecionada, s.status, s.created_at
    from tb_support s
    join cadastro u on s.idUser = u.id_cadastro
    order by s.created_at DESC
  `;
  const [rows] = await conexao.query(sql);
  return rows;
}

export async function buscarMensagem(idSupport) {
  const sql = `
    select s.*, r.resposta, r.created_at AS respostaData
    from tb_support s
    left join tb_support_resposta r on s.id = r.idSupport
    where s.id = ?
  `;
  const [rows] = await conexao.query(sql, [idSupport]);
  return rows[0];
}

export async function salvarResposta(idSupport, idAdmin, resposta) {
  const insertSql = `
    insert into tb_support_resposta (idSupport, idAdmin, resposta)
    values (?, ?, ?)
  `;
  await conexao.query(insertSql, [idSupport, idAdmin, resposta]);

  const updateSql = `update tb_support SET status = 'respondido' where id = ?`;
  await conexao.query(updateSql, [idSupport]);
}
