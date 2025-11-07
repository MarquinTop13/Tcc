import '../../scss/global.scss'
import '../../scss/fonts.scss'
import './verifylinks.scss'
import apiLink from '../../axios'
import Cabecalho2 from '../../components/HeaderPages'
import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import { useState, useEffect } from 'react'

export default function VerifyLinks() {
  // Modo escuro
  const [darkTheme, setDarkTheme] = useState(() => {
    const themeSaved = localStorage.getItem("TemaEscuro");
    return themeSaved ? themeSaved === 'true' : false;
  });

  // Estados para controle de limite
  const [limite, setLimite] = useState(null);
  const [mostrarModalPagamento, setMostrarModalPagamento] = useState(false);
  const [loading, setLoading] = useState(false);

  function ChangeTheme() {
    setDarkTheme(prevTheme => !prevTheme);
  }

  const [link, setLink] = useState('');
  const [user, setUser] = useState(localStorage.getItem('User'));
  const [resultado, setResultado] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [detalhes, setDetalhes] = useState(null);

  // Carregar limite do usuário
  useEffect(() => {
    carregarLimite();
  }, []);

  async function carregarLimite() {
    const email = localStorage.getItem("Email");
    const user = localStorage.getItem("User");
    
    if (!email || !user) return;

    try {
      const response = await apiLink.get(`/VerificarLimiteLink/${email}`);
      setLimite(response.data);
    } catch (error) {
      console.error('Erro ao carregar limite:', error);
    }
  }

  useEffect(() => {
    document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`;
  }, [darkTheme]);

  useEffect(() => {
    localStorage.setItem('TemaEscuro', darkTheme.toString());
  }, [darkTheme]);

  async function VerificarLogin() {
    const user = localStorage.getItem("User");
    const email = localStorage.getItem("Email");
    
    if (!user || user === "" || !email) {
      alert("Faça Login para continuar!");
      return;
    }

    // Verificar se tem limite
    if (limite && limite.maxLink <= 0 && !limite.pago) {
      setMostrarModalPagamento(true);
      return;
    }

    if (!link) {
      alert('Insira um link!');
      return;
    }

    setCarregando(true);
    setDetalhes(null);

    try {
      // Usar o novo endpoint com limite
      const response = await apiLink.post('/check-url-com-limite', { 
        url: link, 
        email: email 
      });
      
      const dados = response.data;

      if (dados.segura) {
        setResultado('✅ SEGURO - Este site parece confiável');
      } else {
        setResultado('🚨 PERIGOSO - Evite este site!');
      }

      // Mostra os detalhes da análise
      setDetalhes(dados.detalhes);

      // Atualizar limite na interface
      setLimite({
        maxLink: dados.limiteRestante,
        pago: dados.pago
      });

    } catch (error) {
      console.error('Erro:', error);
      
      if (error.response?.status === 402) {
        if (error.response.data.tipo === "LIMITE_ATINGIDO") {
          setMostrarModalPagamento(true);
          setResultado('❌ Limite de verificações atingido.');
        } else {
          setResultado('❌ Erro ao processar verificação.');
        }
      } else {
        // Fallback para o endpoint original sem limite
        try {
          const fallbackResponse = await apiLink.post('/check-url', { url: link });
          const fallbackData = fallbackResponse.data;
          
          if (fallbackData.segura) {
            setResultado('✅ SEGURO - Este site parece confiável');
          } else {
            setResultado('🚨 PERIGOSO - Evite este site!');
          }
          setDetalhes(fallbackData.detalhes);
          
        } catch (fallbackError) {
          alert('Erro interno no servidor!\nCaso o problema persista envie uma mensagem ao Suporte!');
        }
      }
    } finally {
      setCarregando(false);
    }
  }

  async function processarPagamento() {
    const email = localStorage.getItem("Email");
    
    try {
      setLoading(true);
      const response = await apiLink.post('/ProcessarPagamento', { email });
      
      alert(response.data.message);
      setMostrarModalPagamento(false);
      setLimite({ maxLink: 999, pago: true });
      
    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      alert('Erro ao processar pagamento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={`MainVerifyLinks ${darkTheme ? "dark" : "light"}`}>
      <Cabecalho2 className="Cabecalho2" darkTheme={darkTheme} onChangeTheme={ChangeTheme} />
      
      {/* Modal de Pagamento */}
      {mostrarModalPagamento && (
        <div className="modal-overlay">
          <div className="modal-pagamento">
            <h3>Limite Atingido! 🚫</h3>
            <p>Você usou todas as suas verificações de links gratuitas.</p>
            <p>Faça o pagamento para continuar usando o verificador de links sem limites!</p>
            
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

      <section className="page-Links">
        <div className="card-Links">
          {/* Informações de Limite */}
          {limite && (
            <div className="info-limite">
              <h4>
                {limite.pago ? '💎 Premium - Verificações Ilimitadas' : 
                 `🔓 Verificações de Links Restantes: ${limite.maxLink}/5`}
              </h4>
              {!limite.pago && limite.maxLink <= 2 && (
                <p className="aviso-limite">
                  ⚠️ Você está ficando sem verificações gratuitas!
                </p>
              )}
            </div>
          )}

          <div className="part1-Links">
            <h2>Verificador de Links</h2>
            <input 
              value={link} 
              onChange={(e) => setLink(e.target.value)} 
              type="text" 
              placeholder='https://sitealeatorio.com.br' 
              disabled={carregando}
            />
          </div>

          <div className="part2-Links">
            <section className="info">
              <h3>Resultado:</h3>
              <pre className={`resultado ${resultado.includes('🚨') ? 'perigoso' : resultado.includes('✅') ? 'seguro' : ''}`}>
                {carregando ? '🔎 Analisando...' : resultado}
              </pre>
            </section>

            {detalhes && (
              <div className="detalhes-analise">
                <h4>Detalhes:</h4>
                
                {detalhes.google && (
                  <div className="analise-item">
                    <strong>Google:</strong> 
                    <span className={detalhes.google.segura ? 'texto-seguro' : 'texto-perigoso'}>
                      {detalhes.google.segura ? '✅ Seguro' : '🚨 Perigoso'}
                    </span>
                  </div>
                )}

                {detalhes.minhaAnalise && (
                  <div className="analise-item">
                    <strong>Análise:</strong> 
                    <span>Pontuação: {detalhes.minhaAnalise.pontosRisco}</span>
                    {detalhes.minhaAnalise.alertas && detalhes.minhaAnalise.alertas.map((alerta, index) => (
                      <div key={index} className="alerta">⚠️ {alerta}</div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <button className='button-verifyLinks' onClick={VerificarLogin} disabled={carregando}>
            {carregando ? 'Verificando...' : 'Verificar'}
          </button>
        </div>
      </section>
    </main>
  );
}