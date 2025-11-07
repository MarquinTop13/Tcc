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

  // Estados para controle de limite
  const [limite, setLimite] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mostrarModalPagamento, setMostrarModalPagamento] = useState(false);

  function ChangeTheme() {
    setDarkTheme(prevTheme => !prevTheme)
  }

  useEffect(() => {
    document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`
  }, [darkTheme]);

  useEffect(() => {
    localStorage.setItem('TemaEscuro', darkTheme.toString())
  }, [darkTheme])

  // Carregar limite do usuário
  useEffect(() => {
    carregarLimite();
  }, []);

  async function carregarLimite() {
    const email = localStorage.getItem("Email");
    const user = localStorage.getItem("User");
    
    if (!email || !user) return;

    try {
      const response = await apiLink.get(`/VerificarLimite/${email}`);
      setLimite(response.data);
    } catch (error) {
      console.error('Erro ao carregar limite:', error);
    }
  }

  async function VerificarLogin() {
    const user = localStorage.getItem("User");
    const email = localStorage.getItem("Email");
    
    if (!user || user === "" || !email) {
      alert("Faça login para continuar");
      return;
    }

    // Verificar se tem limite
    if (limite && limite.maxArquivo <= 0 && !limite.pago) {
      setMostrarModalPagamento(true);
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

    setLoading(true);

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
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
          setLoading(false);
          return;
        }

        // Usar o novo endpoint com limite
        const resposta = await apiLink.post('/VerificarArquivoComLimite', { 
          arquivo: texto, 
          email: email 
        });

        const respNormalizada = String(resposta.data.resposta || resposta.data)
          .trim()
          .toLowerCase();

        if (respNormalizada === "inofensivo") {
          resultado.textContent = '✅ Nenhuma ameaça detectada.';
        } else {
          resultado.textContent = `⚠️ Arquivo suspeito:\n${resposta.data.resposta || resposta.data}`;
        }

        // Atualizar limite na interface
        setLimite({
          maxArquivo: resposta.data.limiteRestante,
          pago: resposta.data.pago
        });

        resultado.classList.add('mostrar');

      } catch (error) {
        console.error('Erro na verificação:', error);
        
        if (error.response?.status === 402) {
          if (error.response.data.tipo === "LIMITE_ATINGIDO") {
            setMostrarModalPagamento(true);
            resultado.textContent = '❌ Limite de verificações atingido.';
          } else {
            resultado.textContent = '❌ Erro ao processar verificação.';
          }
        } else {
          resultado.textContent = '❌ Erro ao verificar arquivo. Tente novamente.';
        }
        resultado.classList.add('mostrar');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(arquivo);
  }

  async function processarPagamento() {
    const email = localStorage.getItem("Email");
    
    try {
      setLoading(true);
      const response = await apiLink.post('/ProcessarPagamento', { email });
      
      alert(response.data.message);
      setMostrarModalPagamento(false);
      setLimite({ maxArquivo: 999, pago: true });
      
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={`MainVerifyArchiver ${darkTheme ? "dark" : "light"}`}>
      <Cabecalho2 darkTheme={darkTheme} onChangeTheme={ChangeTheme} />
      
      {/* Modal de Pagamento */}
      {mostrarModalPagamento && (
        <div className="modal-overlay">
          <div className="modal-pagamento">
            <h3>Limite Atingido! 🚫</h3>
            <p>Você usou todas as suas verificações gratuitas.</p>
            <p>Faça o pagamento para continuar usando o verificador de arquivos sem limites!</p>
            
            <div className="modal-botoes">
              <button 
                onClick={processarPagamento}
                disabled={loading}
                className="btn-pagar"
              >
                {loading ? 'Processando...' : 'Pagar Agora - R$ 9,99'}
              </button>
              <button 
                onClick={() => setMostrarModalPagamento(false)}
                className="btn-cancelar"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="page-archiver">
        <div className="card-archiver">
          {/* Informações de Limite */}
          {limite && (
            <div className="info-limite">
              <h4>
                {limite.pago ? '💎 Premium - Verificações Ilimitadas' : 
                 `🔓 Verificações Restantes: ${limite.maxArquivo}/5`}
              </h4>
              {!limite.pago && limite.maxArquivo <= 2 && (
                <p className="aviso-limite">
                  ⚠️ Você está ficando sem verificações gratuitas!
                </p>
              )}
            </div>
          )}

          <div className="part1-archiver">
            <h2>Verificador de arquivos</h2>
            <input type="file" id="arquivo" />
          </div>

          <div className="part2-archiver">
            <h3>Resultado:</h3>
            <pre className="resultado" id="resultado"></pre>
          </div>
          
          <button 
            className="button-verifyArchiver" 
            onClick={VerificarLogin}
            disabled={loading}
          >
            {loading ? 'Verificando...' : 'Verificar'}
          </button>
        </div>
      </section>
    </main>
  )
}