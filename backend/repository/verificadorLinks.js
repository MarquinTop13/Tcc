import axios from 'axios';
const axios = axios();

const API_KEY = 'AIzaSyCJEVN7KeNxjLDzc3MRNWc4pEEGbF35Fqw';
const API_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';

async function checkUrlSafety(urls) {
    const payload = {
        client: {
            clientId: 'seu-cliente-id',
            clientVersion: '1.0.0'
        },
        threatInfo: {
            threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE'],
            platformTypes: ['ANY_PLATFORM'],
            threatEntryTypes: ['URL'],
            threatEntries: urls.map(url => ({ url }))
        }
    };

    try {
        const response = await axios.post(
            `${API_URL}?key=${API_KEY}`,
            payload,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error) {
        console.error('Erro:', error.response?.data || error.message);
        return null;
    }
}

// Exemplo de uso
const urls = ['http://example.com', 'http://malicious-site.com'];
checkUrlSafety(urls).then(result => console.log(result));