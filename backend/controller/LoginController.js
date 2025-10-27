import {consultarCredenciais, buscarUsuarioPorId} from '../repository/loginRepository.js'
import { Router } from "express";
import generateToken from '../utils/jwt.js';
import {verifyToken} from '../utils/jwt.js'
const endpoints = Router();

endpoints.post('/InserirLogin', async (req,resp) => {
    const dados = req.body;
    const id = await LoginRepository.InserirLogin(dados);
    resp.send({NewId: id});
})

endpoints.post('/Login', async (req, resp) => {
    const { nome, email, senha } = req.body;

    const dados = await consultarCredenciais(nome, email, senha);

    if (!dados) {
        resp.status(401).send("não encontrado")
    } else {
        const token = generateToken({ id: dados.id_login, role: 'user' });
        resp.json({ token });
    }
})

endpoints.post('/LoginADM', async (req, resp) => {
    const token = req.body.tokenInserido;
    const tokenData = verifyToken(token);
    
    if (!tokenData) {
        return resp.status(401).send("Token inválido");
    }

    // Buscar dados completos do usuário no banco
    const usuario = await buscarUsuarioPorId(tokenData.id);
    
    if (!usuario) {
        return resp.status(404).send("Usuário não encontrado");
    }

    resp.send({ Usuario: usuario });
})

export default endpoints;