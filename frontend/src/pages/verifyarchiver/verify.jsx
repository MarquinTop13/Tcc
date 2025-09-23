import '../../scss/global.scss'
import '../../scss/fonts.scss'
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


    resultado.classList.remove('mostrar');
    resultado.textContent = '⏳ Aguarde, estamos verificando...';

    setTimeout(() => {
      resultado.classList.add('mostrar');
    }, 10); 

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
    <main className="MainVerifyArchiver">
      <header className='HeaderVerifyArchiver'>
                <img src="" alt="" />

                <section className="opcoes">
                    <div className="column1">
                        <img src="../../../public/images/arrows.png" />
                        <h3>Modo Escuro</h3>
                    </div>

                    <div className="column2">
                        <h3>Suporte</h3>
                    </div>

                    <div className="column3">
                        <h3>Atualizações</h3>
                        <h3 className='h32'>Serviços</h3>
                    </div>

                    <div className="column4">
                        <h3>Registrar-se</h3>
                        <h3 className='h32'>Login</h3>
                        
                    </div>
                </section>
            </header>
      <section className="card">
        <div className="area">
          <div className="part1">
            <h2>Verificador de Arquivo .BAT</h2>
            <input type="file" id="arquivo" accept=".bat" />
            <button onClick={verificar}>Verificar</button>
          </div>

          <div className="part2">
            <h3>Resultado:</h3>
            <pre className="resultado" id="resultado">Nenhum arquivo analisado ainda.</pre>
          </div>
        </div>
      </section>
    </main>
  )
}