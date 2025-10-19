// VerifyLinks.jsx - VERSÃO CORRIGIDA
import '../../scss/global.scss'
import '../../scss/fonts.scss'
import './verifylinks.scss'
import apiLink from '../../axios'
import Cabecalho2 from '../../components/HeaderPages'
import BackgroundBlack from "/images/Black/BackgroundBlack.png"
import BackgroundWhite from "/images/White/BackgroundWhite.png"
import { useState, useEffect } from 'react'

export default function VerifyLinks() {
    const [darkTheme, setDarkTheme] = useState(true)
    const [link, setLink] = useState('');
    const [resultado, setResultado] = useState('');
    const [carregando, setCarregando] = useState(false);
    const [detalhes, setDetalhes] = useState(null);

    async function VerificarLinks() {
        if (!link) {
            alert('Insira um link!');
            return;
        }

        setCarregando(true);
        setDetalhes(null);

        try {
            const response = await apiLink.post('/check-url', { url: link });
            const dados = response.data;

            // USE dados.segura EM VEZ DE dados.isSafe
            if (dados.segura) {
                setResultado('✅ SEGURO - Este site parece confiável');
            } else {
                setResultado('🚨 PERIGOSO - Evite este site!');
            }

            // Mostra os detalhes da análise
            setDetalhes(dados.detalhes);

        } catch (error) {
            console.error('Erro:', error);
            
            if (link === '') {
                alert('Insira um link!');
            } else {
                // Tenta verificação rápida como fallback
                try {
                    const quickResponse = await apiLink.post('/quick-check', { url: link });
                    const quickData = quickResponse.data;
                    
                    if (quickData.segura) {
                        setResultado('⚠️ Verificação limitada: Site parece seguro');
                    } else {
                        setResultado(`🚨 Risco ${quickData.nivelRisco}: Padrões suspeitos detectados`);
                    }
                    setDetalhes({ minhaAnalise: quickData });
                    
                } catch (fallbackError) {
                    alert('Erro interno no servidor!\nCaso o problema persista envie uma mensagem ao Suporte!');
                }
            }
        } finally {
            setCarregando(false);
        }
    }

    function ChangeTheme() {
        setDarkTheme(prev => !prev);
    }

    useEffect(() => {
        document.body.style.backgroundImage = `url(${darkTheme ? BackgroundBlack : BackgroundWhite})`;
    }, [darkTheme]);

    return (
        <main className={`MainVerifyLinks ${darkTheme ? "dark" : "light"}`}>
            <Cabecalho2 darkTheme={darkTheme} onChangeTheme={ChangeTheme} />
            
            <section className="page-Links">
                <div className="card-Links">
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
                                        {detalhes.minhaAnalise.alertas.map((alerta, index) => (
                                            <div key={index} className="alerta">⚠️ {alerta}</div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <button onClick={VerificarLinks} disabled={carregando}>
                        {carregando ? 'Verificando...' : 'Verificar'}
                    </button>
                </div>
            </section>
        </main>
    )
}