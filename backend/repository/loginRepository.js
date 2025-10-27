import { conexao } from './conections.js';
import MD5 from 'md5';

export async function consultarCredenciais(nome, email, senha) {
  const senhaMD5 = MD5(senha);
  const comando = `
    select 
          id_login,
          nome,
          email
      from tb_login
        where nome = ?
          and email = ?
          and senha = ?
    `;

  const [res] = await conexao.query(comando, [ nome, email, senhaMD5 ]);
  if (res.length > 0) {
    return res[0];
  } else {
    return null;
  }
}
export async function buscarUsuarioPorId(id) {
    // Sua consulta SQL para buscar usuário por ID
    const query = `
        SELECT id_login, nome, email, senha
        FROM tb_login
        WHERE id_login = ?
    `;
    
    const [usuario] = await conexao.query(query, [id]);
    return usuario;
}