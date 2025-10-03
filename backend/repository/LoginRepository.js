import conection from "./conection.js";

export default async function consultarCredenciais( nome, email, senha) {
    const comando = `
      select nome,
             email
        from tb_login
       where nome = ?
         and email = ?
         and senha = ?
    `;
  
    const [registros] = await conection.query(comando, [ nome, email, senha]);
    return registros[0];
}