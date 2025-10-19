import {Router} from "express";
import axios from "axios"
const endpoints = Router();


// Analise de URL offline
function minhaAnaliseManual(url) {
  const resultado = {
    pontosRisco: 0,
    alertas: [],
    MuySuspeito: false
  };

  // Caso se o link for um IP 
  if (url.includes('192.168.') || url.includes('10.') || url.includes('172.')) {
    resultado.pontosRisco += 25;
    resultado.alertas.push('Site feito localmente');
  }

  // Sites que tentam se aplicar com o original
  const sitesFalsos = ['g00gle', 'facebok', 'micr0soft', 'paypa1', 'amaz0n', 'g0v', 'index'];
  if (sitesFalsos.some(site => url.toLowerCase().includes(site))) {
    resultado.pontosRisco += 30;
    resultado.alertas.push('Imita sites famosos');
  }

  // Sites com downloads perigosos
  const extensoesPerigosas = ['.exe', '.bat', '.msi', '.jar', '.scr'];
  if (extensoesPerigosas.some(extensao => url.toLowerCase().includes(extensao))) {
    resultado.pontosRisco += 35;
    resultado.alertas.push('Download de arquivos perigosos');
  }

  // Urls com palavras de capturação de dados
  const palavrasSuspeitas = ['login', 'senha', 'password', 'conta', 'banking'];
  if (palavrasSuspeitas.some(palavra => url.toLowerCase().includes(palavra))) {
    resultado.pontosRisco += 10;
    resultado.alertas.push('Pode roubar dados');
  }

  
  resultado.MuySuspeito = resultado.pontosRisco > 20;

  return resultado;
}



//Endpoints Informativos
endpoints.get('/', (req, res) => {
  res.json({ 
    message: 'Bem-vindo à API Safe Browsing!',
    documentation: 'Acesse /api/info para ver os endpoints'
  });
});

endpoints.get('/info', (req, res) => {
  res.json({
    endpoints: {
      '/api/check-url': 'POST - Verificar uma URL',
      '/api/health': 'GET - Status da API',
      '/api/quick-check': 'POST - Verificação Rápida'
    }
  });
});

endpoints.get('/health', (req, res) => { 
  res.json({ 
    status: 'online', 
    timestamp: new Date().toISOString()
  });
});


endpoints.post('/quick-check', async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL é obrigatória' });
    }

    
    const minhaAnalise = minhaAnaliseManual(url);

    
    res.json({
      url: url,
      segura: !minhaAnalise.MuySuspeito,
      pontosRisco: minhaAnalise.pontosRisco,
      alertas: minhaAnalise.alertas,
      nivelRisco: minhaAnalise.pontosRisco > 40 ? 'ALTO' : 
                 minhaAnalise.pontosRisco >= 20 ? 'MÉDIO' : 'BAIXO',
    });

  } catch (error) {
    res.status(500).json({ 
      error: 'Erro na verificação',
      message: error.message 
    });
  }
});


endpoints.post('/check-url', async (req, res) => { 
  try {
    const { url } = req.body;

    // Validações básicas
    if (!url) {
      return res.status(400).json({ 
        error: 'URL é obrigatória',
        example: { "url": "https://example.com" }
      });
    }

    // Verifica se URL é válida
    try {
      new URL(url);
    } catch (error) {
      return res.status(400).json({
        error: 'URL inválida',
        message: 'Use formato: https://exemplo.com'
      });
    }

    const API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
    if (!API_KEY) {
      return res.status(500).json({
        error: 'API Key do Google está com erros'
      });
    }

    const [resultadoGoogle, minhaAnalise] = await Promise.all([
      // Verificação do Google
      verificarComGoogle(url, API_KEY),
      
      // Verificação Manual (Caso a do google tenha caido)
      Promise.resolve(minhaAnaliseManual(url))
    ]);

    // COMBINA OS RESULTADOS
    const urlSegura = resultadoGoogle.seguro && !minhaAnalise.MuySuspeito;

    // RESPOSTA FINAL
    res.json({
      url: url,
      segura: urlSegura,
      timestamp: new Date().toISOString(),
      
      // Detalhes das análises
      detalhes: {
        google: {
          segura: resultadoGoogle.seguro,
          ameacas: resultadoGoogle.ameacas
        },
        minhaAnalise: {
          pontosRisco: minhaAnalise.pontosRisco,
          alertas: minhaAnalise.alertas,
          MuySuspeito: minhaAnalise.MuySuspeito
        }
      },

      // Recomendação final
      recomendacao: urlSegura ? 
        '✅ URL segura - pode acessar' : 
        '🚨 PERIGO - Evite este site!'
    });

  } catch (error) {
    console.error('Erro na verificação:', error);
    
    if (error.response) {
      res.status(error.response.status).json({
        error: 'Erro no serviço do Google',
        details: error.response.data
      });
    } else {
      res.status(500).json({ 
        error: 'Erro interno do servidor',
        message: error.message 
      });
    }
  }
});

async function verificarComGoogle(url, apiKey) {
  try {
    const payload = {
      client: {
        clientId: "meu-tcc",
        clientVersion: "1.0.0"
      },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [{ url }]
      }
    };

    const response = await axios.post(
      `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`,
      payload,
      { 
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      }
    );

    return {
      seguro: !response.data.matches || response.data.matches.length === 0,
      ameacas: response.data.matches || []
    };

  } catch (error) {
    console.log('Google indisponível:', error.message);
    return {
      seguro: true,
      ameacas: [],
      erro: 'Google indisponível'
    };
  }
}

export default endpoints;