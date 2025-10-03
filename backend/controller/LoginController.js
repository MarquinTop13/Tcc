import consultarCredenciais from '../Repository/loginRepository.js';
import generateToken from '../utils/jwt.js';
import { Router } from 'express';

const endpoints = Router();

endpoints.post("/login", async (req, res) => {
  const { nome, email, senha } = req.body;
  const credenciais = await consultarCredenciais(nome, email, senha);

  if (!credenciais) return res.status(401).json({ erro: "Credenciais inválidas." });

  res.json({ token: generateToken(credenciais) });
});

export default endpoints;