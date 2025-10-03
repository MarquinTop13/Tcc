import conection from "./conection.js";

export async function salvarUsuario({ nome, email, senha, palavra }) {
  const sql = `
    insert into cadastro (nome, email, senha, palavra)
    values (?, ?, ?, ?)
  `;
  const [res] = await conection.execute(sql, [nome, email, senha, palavra]);
  return res.insertId;
}
export async function salvarLogin({ id_cadastro, nome, email, senha }) {
  const sql = `
    insert into tb_login (id_cadastro, nome, email, senha)
    values (?, ?, ?, ?)
  `;
  const [res] = await conection.execute(sql, [id_cadastro, nome, email, senha]);
  return res.insertId;
}