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

  // VERIFICA SE É ADMIN
  const user = localStorage.getItem("User");
  const isAdmin = user === "MgsTop13" || user === "Gustavo2";

  // Carregar limite do usuário
  useEffect(() => {
    carregarLimite();
  }, []);

  async function carregarLimite() {
    const email = localStorage.getItem("Email");
    const user = localStorage.getItem("User");
    
    if (!email || !user) return;

    // SE FOR ADMIN, NÃO PRECISA CARREGAR LIMITE
    if (isAdmin) {
      setLimite({ maxArquivo: 9999 });
      return;
    }

    try {
      // SEM /api - rota direta
      const response = await apiLink.get(`/VerificarLimite/${email}`);
      setLimite(response.data);
    } catch (error) {
      console.error('Erro ao carregar limite:', error);
    }
  }

  async function processarPagamento() {
    const email = localStorage.getItem("Email");
    
    try {
      setLoading(true);
      // SEM /api - rota direta (se este endpoint existir)
      const response = await apiLink.post('/ProcessarPagamento', { email });
      
      alert(response.data.message);
      setMostrarModalPagamento(false);
      setLimite({ maxArquivo: 999 });
      
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  async function VerificarLogin() {
    const user = localStorage.getItem("User");
    const email = localStorage.getItem("Email");
    
    if (!user || user === "" || !email) {
      alert("Faça login para continuar");
      return;
    }

    // SE NÃO FOR ADMIN, VERIFICA LIMITE
    if (!isAdmin && limite && limite.maxArquivo <= 0) {
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

    // VERIFICA TAMANHO DO ARQUIVO (500KB)
    if (arquivo.size > 500 * 1024) {
      resultado.textContent = '❌ Arquivo muito grande. Limite: 500KB';
      resultado.classList.add('mostrar');
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
        let texto = e.target.result;

        // LIMPE OS CARACTERES DE CONTROLE ANTES DE ENVIAR
        texto = texto.replace(/[\x00-\x1F\x7F-\x9F]/g, '');
        texto = texto.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        texto = texto.replace(/\s+/g, ' ').trim();


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
          cmd.palavras.some(p => texto.toLowerCase().includes(p.toLowerCase()))
        );

        if (encontrados.length > 0) {
          const lista = encontrados.map(c => c.descricao).join('\n');
          resultado.textContent = `⚠️ Detectamos comandos suspeitos:\n${lista}`;
          resultado.classList.add('mostrar');
          setLoading(false);
          return;
        }

        let resposta;
        
        // SE FOR ADMIN, USA ENDPOINT SEM LIMITE
        if (isAdmin) {
          // SEM /api - rota direta
          resposta = await apiLink.post('/VerificarArquivo', { 
            arquivo: texto
          });
        } 
        // SE NÃO FOR ADMIN, USA ENDPOINT COM LIMITE
        else {
          // SEM /api - rota direta
          resposta = await apiLink.post('/VerificarArquivoComLimite', { 
            arquivo: texto, 
            email: email,
            nome: user 
          });
          
          // Atualizar limite na interface (apenas para não-admin)
          setLimite({
            maxArquivo: resposta.data.limiteRestante
          });
        }


        const respNormalizada = String(resposta.data.Resposta || resposta.data)
          .trim()
          .toLowerCase();


        if (respNormalizada === "inofensivo") {
          resultado.textContent = '✅ Nenhuma ameaça detectada.';
        } else if (respNormalizada.startsWith('perigoso')) {
          resultado.textContent = `🚨 ${resposta.data.Resposta || resposta.data}`;
        } else {
          resultado.textContent = `⚠️ Resultado: ${resposta.data.Resposta || resposta.data}`;
        }

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
          // Fallback para o endpoint original sem limite
          try {
            // SEM /api - rota direta
            const fallbackResponse = await apiLink.post('/VerificarArquivo', { 
              arquivo: texto 
            });
            
            console.log('🔍 Fallback response:', fallbackResponse.data);
            
            const respNormalizada = String(fallbackResponse.data.Resposta || fallbackResponse.data)
              .trim()
              .toLowerCase();

            if (respNormalizada === "inofensivo") {
              resultado.textContent = '✅ Nenhuma ameaça detectada.';
            } else if (respNormalizada.startsWith('perigoso')) {
              resultado.textContent = `🚨 ${fallbackResponse.data.Resposta || fallbackResponse.data}`;
            } else {
              resultado.textContent = `⚠️ Resultado: ${fallbackResponse.data.Resposta || fallbackResponse.data}`;
            }
            
          } catch (fallbackError) {
            console.error('Erro no fallback:', fallbackError);
            
            // Mostra mensagem específica do erro
            if (fallbackError.response?.data?.error) {
              resultado.textContent = `❌ ${fallbackError.response.data.error}`;
            } else {
              resultado.textContent = '❌ Erro ao verificar arquivo. Tente novamente.';
            }
          }
        }
        resultado.classList.add('mostrar');
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(arquivo);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Enter") {
        VerificarLogin();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className={`MainVerifyArchiver ${darkTheme ? "dark" : "light"} ${!isAdmin && limite?.maxArquivo === 0 ? 'limite-zero' : ''}`}>
      <Cabecalho2 darkTheme={darkTheme} onChangeTheme={ChangeTheme} />
      
      {/* Modal de Pagamento - SÓ APARECE PARA NÃO-ADMIN */}
      {!isAdmin && mostrarModalPagamento && (
        <div className="modal-overlay">
          <div className="modal-pagamento">
            <h3>Limite Atingido! 🚫</h3>
            <p>Você usou todas as suas verificações de arquivos gratuitas.</p>
            <p>Faça o pagamento para continuar usando o verificador de arquivos sem limites!</p>
            
            <div className="modal-botoes">
              <button 
                onClick={processarPagamento}
                disabled={loading}
                className="btn-pagar"
              >
                {loading ? 'Processando...' : 'Pagar Agora - R$ 2,99'}
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
          {/* Informações de Limite - COMPORTAMENTO DIFERENTE PARA ADMIN */}
          {limite && (
            <div className={`info-limite ${!isAdmin && limite.maxArquivo === 0 ? 'zero' : ''}`}>
              <h4>
                {isAdmin ? (
                  <>💎 <span style={{color: '#20c997'}}>ADMIN - Verificações Ilimitadas</span></>
                ) : limite.maxArquivo === 0 ? (
                  '🚫 Limite Esgotado!'
                ) : (
                  `🔓 Verificações Restantes: ${limite.maxArquivo}/5`
                )}
              </h4>
              
              {!isAdmin && limite.maxArquivo <= 2 && limite.maxArquivo > 0 && (
                <p className="aviso-limite">
                  ⚠️ Você está ficando sem verificações gratuitas!
                </p>
              )}
              
              {!isAdmin && limite.maxArquivo === 0 && (
                <p style={{ margin: '10px 0 0 0', fontSize: '0.9rem', opacity: '0.9' }}>
                  Faça upgrade para verificar mais arquivos!
                </p>
              )}
            </div>
          )}

          <div className="part1-archiver">
            <h2>Verificador de Arquivos</h2>
            <input 
              type="file" 
              id="arquivo" 
              accept=".bat,.sh,.ps1,.vbs,.cmd,.txt"
              disabled={!isAdmin && limite?.maxArquivo === 0}
            />
          </div>

          <div className="part2-archiver">
            <h3>Resultado:</h3>
            <pre 
              className="resultado" 
              id="resultado"
              style={{
                minHeight: '100px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {!isAdmin && limite?.maxArquivo === 0 
                ? '💎 Faça upgrade para verificar arquivos' 
                : '🔍 Aguardando verificação...'
              }
            </pre>
          </div>
          
          <button 
            className="button-verifyArchiver" 
            onClick={VerificarLogin}
            disabled={loading || (!isAdmin && limite?.maxArquivo === 0)}
          >
            {loading ? '🔎 Verificando...' :
             !isAdmin && limite?.maxArquivo === 0 ? '💎 Upgrade Necessário' :
             '🔍 Verificar Arquivo'}
          </button>
        </div>
      </section>
    </main>
  )
}