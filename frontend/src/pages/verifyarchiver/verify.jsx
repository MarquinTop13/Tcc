import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import Cabecalho2 from '../../components/HeaderPages';
import apiLink from '../../axios.js'
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

  function ChangeTheme() {
    setDarkTheme(prevTheme => !prevTheme)
  }

  useEffect(() => {
    document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`
  }, [darkTheme]);

  useEffect(() => {
    localStorage.setItem('TemaEscuro', darkTheme.toString())
  }, [darkTheme])

  const [user, setUser] = useState(localStorage.getItem('User'))
  async function VerificarLogin() {
    const user = localStorage.getItem("User");
    if (!user || user === "") {
      alert("Faça login para continuar");
      return;
    }

    //Verificador De arquivos:
    const extensoesSuportadas = ['bat', 'sh', 'ps1', 'vbs', 'cmd', 'txt'];
    const arquivo = document.getElementById('arquivo').files[0];
    const resultado = document.getElementById('resultado');

    if (!arquivo) {
      alert('Nenhum arquivo selecionado.');
      return;
    }

    const extensao = arquivo.name.split('.').pop().toLowerCase();
    if (!extensoesSuportadas.includes(extensao)) {
      resultado.textContent = `❌ Tipo de arquivo não suportado: .${extensao} Suportados: ${extensoesSuportadas.join(', ')}`;
      resultado.classList.add('mostrar');
      return;
    }

    resultado.classList.remove('mostrar');
    resultado.textContent = '⏳ Aguarde, verificando arquivo...';
    setTimeout(() => resultado.classList.add('mostrar'), 10);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const texto = e.target.result.toLowerCase();

      const comandos = [
        { palavras: ['del', 'remove', 'delete', 'erase', 'rd', 'rmdir'], descricao: 'Remove pastas/arquivos' },
        { palavras: ['move'], descricao: 'Move arquivos ou pastas' },
        { palavras: ['cipher'], descricao: 'Criptografa arquivos' },
        { palavras: ['format'], descricao: 'Formata o disco' },
        { palavras: ['start cmd', 'cmd.exe', 'powershell'], descricao: 'Executa comandos via terminal' },
        { palavras: ['.exe'], descricao: 'Executa binário' },
        { palavras: ['shutdown'], descricao: 'Desliga o sistema' }
      ];

      const encontrados = comandos.filter(cmd =>
        cmd.palavras.some(p => texto.includes(p))
      );

      if (encontrados.length > 0) {
        const lista = encontrados.map(c => c.descricao).join('\n');
        resultado.textContent = `⚠️ Detectamos comandos suspeitos:\n${lista}`;
        resultado.classList.add('mostrar');
        return;
      }

      const respostaGemini = await apiLink.post('/VerificarArquivo', { arquivo: texto });

      const respNormalizada = String(respostaGemini.data.Resposta || respostaGemini.data.resposta || respostaGemini.data)
        .trim()
        .toLowerCase();

      if (respNormalizada === "inofensivo") {
        resultado.textContent = '✅ Nenhuma ameaça detectada.';
      } else {
        resultado.textContent = `⚠️ Arquivo suspeito:\n${respostaGemini.data.Resposta || respostaGemini.data}`;
      }

      resultado.classList.add('mostrar');
    };

    reader.readAsText(arquivo);
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
          <button className="button-verifyArchiver" onClick={VerificarLogin}>Verificar</button>
        </div>
      </section>
    </main>
  )
}