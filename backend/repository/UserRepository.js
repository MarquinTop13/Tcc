// repository/UserRepository.js
import { conexao } from "./conections.js";

// Funções gerais de usuário que são compartilhadas
export async function resetarLimites(email) {
  const command = `
      UPDATE cadastro 
      SET maxArquivo = 5, maxLink = 5 
      WHERE email = ?
  `;
  
  const [result] = await conexao.query(command, [email]);
  return result.affectedRows > 0;
}

export async function atualizarStatusPagamento(email) {
  const command = `
      UPDATE cadastro 
      SET pago = 1, maxArquivo = 111, maxLink = 111 
      WHERE email = ?
  `;
  
  const [result] = await conexao.query(command, [email]);
  return result.affectedRows > 0;
}

export async function buscarUsuarioPorEmail(email) {
  const command = `
      SELECT id_cadastro, nome, email, pago, maxArquivo, maxLink 
      FROM cadastro 
      WHERE email = ?
  `;
  
  const [rows] = await conexao.query(command, [email]);
  return rows[0];
}