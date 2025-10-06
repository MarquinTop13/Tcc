import {Router} from "express";
import axios from "axios"
const endpoints = Router();


endpoints.get('/', (req, res) => {
  res.json({ 
    message: 'API Safe Browsing funcionando!',
    endpoints: {
      '/api/check-url': 'POST - Verificar uma URL',
      '/api/health': 'GET - Status da API'
    }
  });
});


endpoints.get('/health', (req, res) => { 
  res.json({ 
    status: 'online', 
    timestamp: new Date().toISOString(),
    service: 'Google Safe Browsing API'
  });
});


endpoints.post('/check-url', async (req, res) => { 
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ 
        error: 'URL é obrigatória',
        example: { "url": "https://example.com" }
      });
    }

    const API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
    const API_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';

    if (!API_KEY) {
      return res.status(500).json({
        error: 'Configuração do servidor incompleta',
        message: 'API Key não configurada'
      });
    }

    const payload = {
      client: {
        clientId: "safe-browsing-api",
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
      `${API_URL}?key=${API_KEY}`,
      payload,
      { 
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      }
    );

    const result = {
      url: url,
      isSafe: !response.data.matches || response.data.matches.length === 0,
      timestamp: new Date().toISOString(),
      threats: response.data.matches || []
    };

    res.json(result);

  } catch (error) {
    console.error('Erro na verificação:', error);
    
    if (error.response) {
      res.status(error.response.status).json({
        error: 'Erro na API do Google',
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


endpoints.post('/check-multiple', async (req, res) => { 
  try {
    const { urls } = req.body;

    if (!urls || !Array.isArray(urls)) {
      return res.status(400).json({ 
        error: 'Lista de URLs é obrigatória',
        example: { "urls": ["https://example.com", "https://google.com"] }
      });
    }

    const API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
    const API_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';

    if (!API_KEY) {
      return res.status(500).json({
        error: 'Configuração do servidor incompleta',
        message: 'API Key não configurada'
      });
    }

    const payload = {
      client: {
        clientId: "safe-browsing-api",
        clientVersion: "1.0.0"
      },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: urls.map(url => ({ url }))
      }
    };

    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      payload,
      { 
        headers: { 'Content-Type': 'application/json' },
        timeout: 10000
      }
    );

    const results = urls.map(url => {
      const threat = response.data.matches?.find(match => match.threat.url === url);
      return {
        url,
        isSafe: !threat,
        threatType: threat?.threatType,
        platformType: threat?.platformType
      };
    });

    res.json({
      timestamp: new Date().toISOString(),
      totalUrls: urls.length,
      safeUrls: results.filter(r => r.isSafe).length,
      dangerousUrls: results.filter(r => !r.isSafe).length,
      results
    });

  } catch (error) {
    console.error('Erro na verificação múltipla:', error);
    res.status(500).json({ 
      error: 'Erro interno do servidor',
      message: error.message 
    });
  }
});

export default endpoints;