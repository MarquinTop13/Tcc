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
  const [mostrarModalPagamento, setMostrarModal] = useState(false);
  const [loading, setLoading] = useState(false);

  function ChangeTheme() {
    setDarkTheme(prevTheme => !prevTheme);
  }

  const [link, setLink] = useState('');
  const [user, setUser] = useState(localStorage.getItem('User'));
  const [resultado, setResultado] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [detalhes, setDetalhes] = useState(null);

  // VERIFICA SE É ADMIN
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
      setLimite({ maxLink: 9999 }); // Número alto para indicar ilimitado
      return;
    }
    
    // SE NÃO FOR ADMIN, CARREGA LIMITE NORMAL
    try {
      const response = await apiLink.get(`/api/VerificarLimiteLink/${email}`);
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

    // SE NÃO FOR ADMIN, VERIFICA LIMITE
    if (!isAdmin && limite && limite.maxLink <= 0) {
      setMostrarModal(true);
      return;
    }

    if (!link) {
      alert('Insira um link!');
      return;
    }

    setCarregando(true);
    setDetalhes(null);

    try {
      let response;
      
      // SE FOR ADMIN, USA ENDPOINT SEM LIMITE
      if (isAdmin) {
        response = await apiLink.post('/api/check-url', {
          url: link
        });
      } 
      // SE NÃO FOR ADMIN, USA ENDPOINT COM LIMITE
      else {
        response = await apiLink.post('/api/check-url-com-limite', {
          url: link,
          email: email,
          nome: user
        });
        
        // Atualiza o limite na interface (apenas para não-admin)
        const dados = response.data;
        setLimite({
          maxLink: dados.limiteRestante
        });
      }

      const dados = response.data;

      if (dados.segura) {
        setResultado('✅ SEGURO - Este site parece confiável');
      } else {
        setResultado('🚨 PERIGOSO - Evite este site!');
      }

      // Mostra os detalhes da análise
      setDetalhes(dados.detalhes);

    } catch (error) {
      console.error('Erro:', error);

      if (error.response?.status === 402) {
        if (error.response.data.tipo === "LIMITE_ATINGIDO") {
          setMostrarModal(true);
          setResultado('❌ Limite de verificações atingido.');
        } else {
          setResultado('❌ Erro ao processar verificação.');
        }
      } else {
        try {
          const fallbackResponse = await apiLink.post('/api/check-url', { url: link });
          const fallbackData = fallbackResponse.data;

          if (fallbackData.segura) {
            setResultado('✅ SEGURO - Este site parece confiável');
          } else {
            setResultado('🚨 PERIGOSO - Evite este site!');
          }
          setDetalhes(fallbackData.detalhes);

        } catch (fallbackError) {
          setResultado(fallbackError.response?.data?.error + '\nO link precisa de https://');
          }
    
        
      }
    } finally {
      setCarregando(false);
    }
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
    <main className={`MainVerifyLinks ${darkTheme ? "dark" : "light"} ${!isAdmin && limite?.maxLink === 0 ? 'limite-zero' : ''}`}>
      <Cabecalho2 className="Cabecalho2" darkTheme={darkTheme} onChangeTheme={ChangeTheme} />

      {/* Modal de Limite Atingido - SÓ APARECE PARA NÃO-ADMIN */}
      {!isAdmin && mostrarModalPagamento && (
        <div className="modal-overlay">
          <div className="modal-pagamento">
            <h3>Limite Esgotado!</h3>
            <p>🚫 Você utilizou todas as suas verificações gratuitas</p>
            <p>Infelizmente você atingiu o limite máximo de verificações de links. Para continuar protegendo sua segurança online, faça o upgrade para a versão premium.</p>
            <p>💎 <strong>Premium inclui:</strong> Verificações ilimitadas + Análise avançada + Suporte prioritário</p>

            <div className="modal-botoes">
              <button
                disabled={loading}
                className="btn-pagar"
              >
                {loading ? (
                  <>
                    <span style={{ marginRight: '8px' }}>⏳</span>
                    Processando...
                  </>
                ) : (
                  <>
                    <span style={{ marginRight: '8px' }}>💎</span>
                    Upgrade Premium - R$ 2,99
                  </>
                )}
              </button>
              <button
                onClick={() => setMostrarModal(false)}
                className="btn-cancelar"
              >
                <span style={{ marginRight: '8px' }}>↩️</span>
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="page-Links">
        <div className="card-Links">
          {/* Informações de Limite - COMPORTAMENTO DIFERENTE PARA ADMIN */}
          {limite && (
            <div className={`info-limite ${!isAdmin && limite.maxLink === 0 ? 'zero' : ''}`}>
              <h4>
                {isAdmin ? (
                  <>💎 <span style={{color: '#20c997'}}>ADMIN - Verificações Ilimitadas</span></>
                ) : limite.maxLink === 0 ? (
                  '🚫 Limite Esgotado!'
                ) : (
                  `🔓 Verificações Restantes: ${limite.maxLink}/5`
                )}
              </h4>
              
              {!isAdmin && limite.maxLink <= 2 && limite.maxLink > 0 && (
                <p className="aviso-limite">
                  ⚠️ Você está ficando sem verificações gratuitas!
                </p>
              )}
              
              {!isAdmin && limite.maxLink === 0 && (
                <p style={{ margin: '10px 0 0 0', fontSize: '0.9rem', opacity: '0.9' }}>
                  Vá na parte de pagamento para conseguir mais cotas!
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
              placeholder={
                !isAdmin && limite?.maxLink === 0
                  ? 'Compre mais cotas para verificar links'
                  : 'https://sitealeatorio.com.br'
              }
              disabled={carregando || (!isAdmin && limite?.maxLink === 0)}
            />
          </div>

          <div className="part2-Links">
            <section className="info">
              <h3>Resultado:</h3>
              <pre className={`resultado ${resultado.includes('🚨') ? 'perigoso' : resultado.includes('✅') ? 'seguro' : ''}`}>
                {carregando ? '🔎 Analisando...' :
                  !isAdmin && limite?.maxLink === 0 ? 'Compre mais cotas para verificar links' :
                    resultado || '🔍 Aguardando verificação...'}
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

          <button
            className='button-verifyLinks'
            onClick={VerificarLogin}
            disabled={carregando || (!isAdmin && limite?.maxLink === 0)}
          >
            {carregando ? '🔎 Verificando...' :
              !isAdmin && limite?.maxLink === 0 ? 'Upgrade Necessário' :
                '🔍 Verificar Link'}
          </button>
        </div>
      </section>
    </main>
  );
}