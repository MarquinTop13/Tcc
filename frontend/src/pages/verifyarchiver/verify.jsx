import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import Cabecalho2 from '../../components/HeaderPages';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import '../../scss/global.scss';
import '../../scss/fonts.scss';
import "./verify.scss";

export default function Verify() {
   //Modo escuro:
          const [darkTheme, setDarkTheme] = useState(() => {
              const themeSaved = localStorage.getItem("TemaEscuro");
              return themeSaved ? themeSaved === 'true' : false;
          })
          //Mudar tema escuro para claro
          function ChangeTheme() {
              setDarkTheme(prevTheme => !prevTheme)
          }
  
          //Background mudando de acordo com o tema escolhido
          useEffect(() => {
              document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`
          }, [darkTheme]);
  
          //Setar o modo escuro no localStorage
          useEffect(() => {
              localStorage.setItem('TemaEscuro', darkTheme.toString())
          }, [darkTheme])
  

  //Verificação dos arquivos:
  const extensoesSuportadas = ['bat','sh','ps1','vbs','cmd', 'txt'];

  function getExtension(filename) {
    if (!filename || filename.indexOf('.') === -1) return '';
    return filename.split('.').pop().toLowerCase();
  }

  function isScriptExtension(ext) {
    return extensoesSuportadas.includes(ext);
  }


  function verificar() {
    const arquivo = document.getElementById('arquivo').files[0];
    const resultado = document.getElementById('resultado');

    if (!arquivo) {
      alert('Nenhum arquivo selecionado.');
      return;
    }

    const extensao = getExtension(arquivo.name);

    if(!isScriptExtension(extensao)){
      resultado.textContent = `❌ Tipo de arquivo não suportado: .${extensao}\nSuportados: ${extensoesSuportadas.join(', ')}`;
      resultado.classList.add('mostrar');
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
        resultado.textContent = `⚠️ Detectamos comandos perigosos:\n${comandosList}`;
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
          <button className="button-verifyArchiver" onClick={verificar}>Verificar</button>
        </div>
      </section>
    </main>
  )
}