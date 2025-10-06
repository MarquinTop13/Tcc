import conection from "./conection.js";
import md5 from 'md5';

export default async function consultarCredenciais(nome, email, senha) {
  const senhaMD5 = md5(senha);
  const comando = `
      select nome,
             email
        from tb_login
       where nome = ?
         and email = ?
         and senha = ?
    `;

  const [res] = await conection.query(comando, [nome, email, senhaMD5]);
  if (res.length > 0) {
    return res[0];
  } else {
    return null;
  }
}