import { conexao } from './conections.js';
import MD5 from 'md5';

export default async function consultarCredenciais(nome, email, senha) {
  const senhaMD5 = MD5(senha);
  const comando = `
    select nome,
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