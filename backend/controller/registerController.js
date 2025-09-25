import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
const API_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';

async function testarUrl(url) {
  console.log(`🔍 Testando URL: ${url}`);
  
  const payload = {
    client: {
      clientId: "safe-browsing-test",
      clientVersion: "1.0.0"
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }]
    }
  };

  try {
    const response = await axios.post(
      `${API_URL}?key=${API_KEY}`,
      payload,
      { 
        headers: { 
          'Content-Type': 'application/json' 
        },
        timeout: 10000
      }
    );

    if (response.data.matches && response.data.matches.length > 0) {
      console.log('❌ URL PERIGOSA DETECTADA!');
      response.data.matches.forEach((match, index) => {
        console.log(`\nAmeaça ${index + 1}:`);
        console.log(`- Tipo: ${match.threatType}`);
        console.log(`- Plataforma: ${match.platformType}`);
        console.log(`- URL: ${match.threat.url}`);
      });
    } else {
      console.log('✅ URL SEGURA');
    }

    return response.data;

  } catch (error) {
    console.error('❌ Erro na requisição:');
    
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else {
      console.log('Erro:', error.message);
    }
    
    return null;
  }
}

// Função para testar múltiplas URLs
async function testarVariasUrls() {
  const urlsParaTestar = [
    "http://google.com",           // Deve ser segura
    "https://github.com",          // Deve ser segura  
    "http://malware.testing.google.test/testing/malware/", // URL de teste do Google
    "https://www.facebook.com",    // Deve ser segura
    "http://example.com"           // Deve ser segura
  ];

  console.log('🚀 Iniciando testes de URLs...\n');

  for (const url of urlsParaTestar) {
    await testarUrl(url);
    console.log('─'.repeat(50)); // Separador
    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay entre requests
  }
}

// Teste individual
async function testeIndividual() {
  const url = "http://malware.testing.google.test/testing/malware/";
  await testarUrl(url);
}

// Executar testes
async function main() {
  if (!API_KEY) {
    console.error('❌ Chave da API não encontrada!');
    console.log('💡 Configure sua chave no arquivo .env:');
    console.log('GOOGLE_SAFE_BROWSING_API_KEY=sua_chave_aqui');
    return;
  }

  console.log('🔑 Chave da API carregada com sucesso!');
  console.log('📝 Escolha o tipo de teste:');
  console.log('1. Teste individual');
  console.log('2. Teste múltiplas URLs');
  
  // Para teste rápido, vamos executar o múltiplo
  await testarVariasUrls();
}

main().catch(console.error);