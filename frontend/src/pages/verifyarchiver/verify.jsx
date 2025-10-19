import { Link } from 'react-router';
import Cabecalho2 from '../../components/HeaderPages';
import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import '../../scss/global.scss';
import '../../scss/fonts.scss';
import "./verify.scss";
import { useEffect, useState } from 'react';

export default function Verify() {

  const [darkTheme, setDarkTheme] = useState(true);

  function ChangeTheme() {
    setDarkTheme(nomeAleatorio => !nomeAleatorio)
  }

  useEffect(() => {
    document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`;
  }, [darkTheme]);

  function verificar() {
    const arquivo = document.getElementById('arquivo').files[0];
    const resultado = document.getElementById('resultado');

    if (!arquivo) {
      alert('Nenhum arquivo selecionado.');
      return;
    }

    mostrarCarregamento(resultado);

    // Remove o delay artificial e processa imediatamente
    processarArquivo(arquivo, resultado);
  }

  function mostrarCarregamento(resultado) {
    resultado.classList.remove('mostrar');
    resultado.textContent = '⏳ Aguarde, estamos verificando...';
    setTimeout(() => resultado.classList.add('mostrar'), 10);
  }

  function processarArquivo(arquivo, resultado) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const texto = e.target.result.toLowerCase();
      const comandosPerigosos = verificarComandosPerigosos(texto);
      exibirResultado(comandosPerigosos, resultado);
    };

    reader.readAsText(arquivo);
  }

  function verificarComandosPerigosos(texto) {
    const comandos = [
      { palavras: ['del', 'remove', 'delete', 'erase', 'rd', 'rmdir'], descricao: 'Remove pastas/arquivos' },
      { palavras: ['move'], descricao: 'Move arquivos ou pastas' },
      { palavras: ['cipher'], descricao: 'Criptografa arquivos' },
      { palavras: ['format'], descricao: 'Formata o disco' },
      { palavras: ['start cmd', 'cmd.exe', 'powershell'], descricao: 'Executa comandos perigosos via terminal' },
      { palavras: ['.exe'], descricao: 'Instala/executa comandos perigosos' },
      { palavras: ['shutdown'], descricao: 'Desliga o computador' }
    ];

    return comandos.filter(comando =>
      comando.palavras.some(palavra => texto.includes(palavra))
    );
  }

  function exibirResultado(encontrados, resultado) {
    resultado.classList.remove('mostrar');

    setTimeout(() => {
      if (encontrados.length === 0) {
        resultado.textContent = '✅ Nenhum comando perigoso detectado.';
      } else {
        const comandosList = encontrados.map(c => c.descricao).join('\n');
        resultado.textContent = `⚠️ Detectamos comandos perigosos:\n\n${comandosList}`;
      }

      resultado.classList.add('mostrar');
    }, 400);
  }


  return (
    <main className={`MainVerifyArchiver ${darkTheme ? "dark" : "light"}`}>
      <Cabecalho2 darkTheme={darkTheme} onChangeTheme={ChangeTheme} />
      <section className="page-archiver">
        <div className="card-archiver">
          <div className="part1-archiver">
            <h2>Verificador de arquivos</h2>
            <input type="file" id="arquivo" />

          </div>

          <div className="part2-archiver">
            <h3>Resultado:</h3>
            <pre className="resultado" id="resultado"></pre>
          </div>
          <button onClick={verificar}>Verificar</button>
        </div>
      </section>
    </main>
  )
}