import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { conexao } from "./conections.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function enviarMensagem(texto) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const resposta = await model.generateContent(`Você é um analisador de segurança de arquivos (script/texto). Regras:
    1. Analise apenas o conteúdo textual e verifique se contém **comandos executáveis, trechos de script, ou padrões de instrução** que possam executar ou destruir dados quando rodados (ex.: comandos del, rm -rf, FORMAT, Remove-Item -Recurse -Force, shutdown, cmd.exe, .exe, PowerShell, etc.).
    2. **Classifique** estritamente em duas saídas possíveis:
      - Se houver comandos/executáveis detectáveis ou código perigoso: responda **exatamente** 'Perigoso — <motivo em no máximo 1 linha>'.
      - Se NÃO houver comandos/executáveis (mesmo que haja uma frase de ameaça casual como "vou deletar tudo, hahaha"): responda **exatamente** Inofensivo.
    3. O motivo quando "Perigoso" deve ser direto e em **uma linha curta** citando o padrão detectado (ex.: "contém 'rm -rf /' que apaga recursivamente arquivos").
    4. Ignore linguagem de ódio, sarcasmo ou ameaças verbais que não contenham instruções executáveis — trate-as como 'Inofensivo'.
    5. Seja objetivo; **nenhum texto adicional** além da saída obrigatória acima.

    Exemplos (entrada → saída):
    - "DEL /F /S /Q C:\ "  → Perigoso — contém 'DEL /F /S /Q' que deleta arquivos recursivamente.
    - "rm -rf /" → Perigoso — contém 'rm -rf /' que remove recursivamente do root.
    - "Eu irei deletar tudo que eu vejo pela frente, hahahaha" → Inofensivo
    - "Remove-Item -Path C:\\ -Recurse -Force" → Perigoso — contém 'Remove-Item -Recurse -Force' (PowerShell) que apaga arquivos.
    Agora analise apenas o texto a seguir e responda conforme as regras: 
    <<${texto}>>
  `);
  return resposta.response.text();
}

export async function InserirUpdate(date, text) {
  const command = `
      insert into Updates (DiadoUpdate, informacoes)
      values(?, ?);
  `

  const [info] = await conexao.query(command, [date, text]);
  return info;
}

export async function RemoverUpdate(id) {
  const command = `
      delete from Updates
      where id = ?;
  `
  
  const [info] = await conexao.query(command, [id]);
  return info;
}

export async function ListarUpdates() {
  const command = `
      select 
          id,
          DATE_FORMAT(DiadoUpdate, '%d/%m/%Y') as dataFormatada,
          DiadoUpdate,
          informacoes
      from Updates
      order by DiadoUpdate DESC
  `;
  
  const [updates] = await conexao.query(command);
  return updates;
}

// FUNÇÕES DE LIMITE - CORRIGIDAS
export async function verificarLimiteArquivo(email) {
  const command = `
      SELECT maxArquivo, pago 
      FROM cadastro 
      WHERE email = ?
  `;
  
  const [rows] = await conexao.query(command, [email]);
  return rows[0];
}

export async function verificarLimiteLink(email) {
  const command = `
      SELECT maxLink, pago 
      FROM cadastro 
      WHERE email = ?
  `;
  
  const [rows] = await conexao.query(command, [email]);
  return rows[0];
}

export async function decrementarLimiteArquivo(email) {
  const command = `
      UPDATE cadastro 
      SET maxArquivo = maxArquivo - 1 
      WHERE email = ? AND maxArquivo > 0
  `;
  
  const [result] = await conexao.query(command, [email]);
  return result.affectedRows > 0;
}

export async function decrementarLimiteLink(email) {
  const command = `
      UPDATE cadastro 
      SET maxLink = maxLink - 1 
      WHERE email = ? AND maxLink > 0
  `;
  
  const [result] = await conexao.query(command, [email]);
  return result.affectedRows > 0;
}

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