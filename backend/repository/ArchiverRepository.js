import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function enviarMensagem(texto) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const resposta = await model.generateContent(`Você é um analisador de segurança de arquivos     (script/texto). Regras:
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
  return resposta.response.text()
}