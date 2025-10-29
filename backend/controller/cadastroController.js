import * as Repository from "../repository/cadastroRepository.js";
import { Router } from "express";

const endpoint = Router();

endpoint.post("/registro", async (req, res) => {
  const { nome, email, senha, palavra, confirmarSenha, idade } = req.body;

  if (!nome || !email || !senha || !confirmarSenha || !palavra || !idade)
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });

  if (senha !== confirmarSenha)
    return res.status(400).json({ error: "As senhas não conferem" });

  if (senha.length < 8)
    return res.status(400).json({ error: "A senha deve ter pelo menos 8 caracteres." });

  try {
    const usuarioExiste = await Repository.UserIgual(nome);

    if (usuarioExiste && usuarioExiste.nome === nome) {
      return res.status(400).send("Usuário já existe!");
    }

    const id = await Repository.salvarUsuario({ nome, email, senha, palavra, idade });
    await Repository.salvarLogin({ id_cadastro: id, nome, email, senha });

    res.status(201).json({
      message: "Usuário registrado com sucesso!", id});

  } catch (error) {
    console.error("Erro ao registrar:", error);
    res.status(500).send("Erro interno ao registrar usuário!");
  }
});

export default endpoint;
