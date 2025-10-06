import {conexao} from "./conections.js";

export async function salvarUsuario({ nome, email, senha, palavra }) {
  const sql = `
    insert into cadastro (nome, email, senha, palavra)
    values (?, ?, MD5(?), ?)
  `;
  const [res] = await conexao.execute(sql, [nome, email, senha, palavra]);
  return res.insertId;
}
export async function salvarLogin({ id_cadastro, nome, email, senha }) {
  const sql = `
    insert into tb_login (id_cadastro, nome, email, senha)
    values (?, ?, ?, MD5(?))
  `;
  const [res] = await conexao.execute(sql, [id_cadastro, nome, email, senha]);
  return res.insertId;
}