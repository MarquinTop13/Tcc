import * as ArquivoRepository from "../repository/ArquivoRepository.js"
import { Router } from "express";
import axios from "axios";

const endpoint = Router(); // CORREÇÃO: endpoint, não endpoints

// Middleware para verificar limite de links
async function verificarLimiteLink(req, res, next) {
    const email = req.body.email || req.query.email;
    
    if (!email) {
        return res.status(400).send({ error: "Email é obrigatório" });
    }

    try {
        const usuario = await ArquivoRepository.verificarLimiteLink(email);
        
        if (!usuario) {
            return res.status(404).send({ error: "Usuário não encontrado" });
        }

        if (usuario.maxLink <= 0 && !usuario.pago) {
            return res.status(402).send({ 
                error: "Limite de verificações de links atingido",
                tipo: "LIMITE_ATINGIDO",
                mensagem: "Você atingiu o limite de verificações de links gratuitas. Faça o pagamento para continuar usando o serviço."
            });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.error('Erro ao verificar limite de link:', error);
        res.status(500).send({ error: "Erro interno do servidor" });
    }
}

// SUAS FUNÇÕES EXISTENTES (mantidas intactas)

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

// NOVO ENDPOINT COM LIMITE
endpoint.post('/check-url-com-limite', verificarLimiteLink, async (req, res) => {
  try {
    const { url, email } = req.body;

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

    // Decrementar o limite apenas se não for pago
    if (!req.usuario.pago) {
      const decrementado = await ArquivoRepository.decrementarLimiteLink(email);
      if (!decrementado) {
        return res.status(402).send({ 
          error: "Erro ao atualizar limite",
          tipo: "ERRO_LIMITE"
        });
      }
    }

    const API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
    
    const [resultadoGoogle, minhaAnalise] = await Promise.all([
      // Verificação do Google
      API_KEY ? verificarComGoogle(url, API_KEY) : Promise.resolve({ seguro: true, ameacas: [] }),
      
      // Verificação Manual
      Promise.resolve(minhaAnaliseManual(url))
    ]);

    // COMBINA OS RESULTADOS
    const urlSegura = resultadoGoogle.seguro && !minhaAnalise.MuySuspeito;

    // Obter o novo limite atualizado
    const usuarioAtualizado = await ArquivoRepository.verificarLimiteLink(email);

    // RESPOSTA FINAL COM LIMITE
    res.json({
      url: url,
      segura: urlSegura,
      timestamp: new Date().toISOString(),
      limiteRestante: usuarioAtualizado.maxLink,
      pago: usuarioAtualizado.pago,
      
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
        error: 'Erro no serviço de verificação',
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

// SEUS ENDPOINTS ORIGINAIS (mantidos para compatibilidade) - CORRIGIDOS

endpoint.get('/', (req, res) => { // CORREÇÃO: endpoint, não endpoints
  res.json({ 
    message: 'Bem-vindo à API Safe Browsing!',
    documentation: 'Acesse /api/info para ver os endpoints'
  });
});

endpoint.get('/info', (req, res) => { // CORREÇÃO: endpoint, não endpoints
  res.json({
    endpoints: {
      '/api/check-url': 'POST - Verificar uma URL',
      '/api/health': 'GET - Status da API',
      '/api/quick-check': 'POST - Verificação Rápida',
      '/api/check-url-com-limite': 'POST - Verificação com limite de uso'
    }
  });
});

endpoint.get('/health', (req, res) => {  // CORREÇÃO: endpoint, não endpoints
  res.json({ 
    status: 'online', 
    timestamp: new Date().toISOString()
  });
});

endpoint.post('/quick-check', async (req, res) => { // CORREÇÃO: endpoint, não endpoints
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

endpoint.post('/check-url', async (req, res) => {  // CORREÇÃO: endpoint, não endpoints
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
    
    const [resultadoGoogle, minhaAnalise] = await Promise.all([
      // Verificação do Google
      API_KEY ? verificarComGoogle(url, API_KEY) : Promise.resolve({ seguro: true, ameacas: [] }),
      
      // Verificação Manual
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

// Endpoint para verificar limite de links do usuário
endpoint.get('/VerificarLimiteLink/:email', async (req, res) => {
    const { email } = req.params;
    
    try {
        const usuario = await ArquivoRepository.verificarLimiteLink(email);
        
        if (!usuario) {
            return res.status(404).send({ error: "Usuário não encontrado" });
        }

        res.status(200).send({
            maxLink: usuario.maxLink,
            pago: usuario.pago
        });
    } catch (error) {
        console.error('Erro ao verificar limite de link:', error);
        res.status(500).send({ error: "Erro interno do servidor" });
    }
});

export default endpoint;