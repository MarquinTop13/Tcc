import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AddRotas } from './router.js';

// Carrega variáveis de ambiente PRIMEIRO
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5010;

// Middlewares
app.use(cors());
app.use(express.json());

// Debug: Verificar se a API Key foi carregada
console.log('🔑 API Key carregada:', process.env.GOOGLE_SAFE_BROWSING_API_KEY ? 'Sim' : 'Não');

// Configura todas as rotas
AddRotas(app);

// Rota raiz alternativa
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bem-vindo à API Safe Browsing!',
    documentation: 'Acesse /api para ver os endpoints disponíveis'
  });
});

// Middleware de erro global
app.use((error, req, res, next) => {
  console.error('Erro global:', error);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: error.message 
  });
});



app.listen(PORT, () => {
  console.log(` Servidor rodando na porta ${PORT}`);
});