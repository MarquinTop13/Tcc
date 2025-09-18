import "./verify.scss"

export default function Verify() {

  function verificar() {
    const input = document.getElementById('arquivo');
    const resultado = document.getElementById('resultado');
    const botao = document.getElementById('botaoVerificar');
    const arquivo = input.files[0];

    if (!arquivo) {
      alert('Nenhum arquivo selecionado.');
      return;
    }

    // Remove visibilidade antes da nova mensagem
    resultado.classList.remove('mostrar');
    resultado.textContent = '⏳ Aguarde, estamos verificando...';

    // Mostra a mensagem com transição de 500ms
    setTimeout(() => {
      resultado.classList.add('mostrar');
    }, 10); // pequeno delay para ativar a transição

    // Após 3 segundos, faz a verificação
    setTimeout(() => {
      const reader = new FileReader();

      reader.onload = function (e) {
        const texto = e.target.result.toLowerCase();

        const comandos = [
          { palavra: 'del' || 'remove' || 'delete' || 'erase' || 'rd' || 'rmdir', descricao: 'Remove pastas/arquivos' },
          { palavra: 'move', descricao: 'Move arquivos ou pastas' },
          { palavra: 'cipher', descricao: 'Criptografa arquivos' },
          { palavra: 'format', descricao: 'Formata o disco' },
          { palavra: 'start cmd', descricao: 'Executa comandos perigosos' },
          { palavra: 'cmd.exe', descricao: 'Executa comandos perigosos' },
          { palavra: '.exe', descricao: 'Instala/executa comandos perigosos' },
          { palavra: 'powershell', descricao: 'Executa comandos perigosos' },
          { palavra: 'shutdown', descricao: 'Desliga o computador' }
        ];

        const encontrados = comandos.filter(c => texto.includes(c.palavra));

        resultado.classList.remove('mostrar');

        setTimeout(() => {
          if (encontrados.length === 0) {
            resultado.textContent = '✅ Nenhum comando perigoso detectado.';
          } else {
            let saida = '⚠️ Detectamos alguns comandos perigosos:\n\n';
            encontrados.forEach(c => {
              saida += `${c.descricao}\n`;
            });
            resultado.textContent = saida;
          }

          resultado.classList.add('mostrar');
          document.querySelector('.part2').appendChild(botao);
        }, 400);
      };

      reader.readAsText(arquivo);
    }, 3500);
  }


  return (
    <main>
      <header></header>
      <section>
        <div className="area">
          <div className="part1">
            <h2>Verificador de Arquivo .BAT</h2>
            <input type="file" id="arquivo" accept=".bat" />
            <button onClick={verificar}>Verificar</button>
          </div>

          <div className="part2">
            <h3>Resultado:</h3>
            <pre class="resultado" id="resultado">Nenhum arquivo analisado ainda.</pre>
          </div>
        </div>
      </section>
    </main>
  )
}