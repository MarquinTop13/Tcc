import consultarCredenciais from '../repository/loginRepository.js'
import { Router } from "express";
import generateToken from '../utils/jwt.js';
import getAuthentication from '../utils/jwt.js'
const endpoints = Router();

endpoints.post('/InserirLogin', async (req,resp) => {
    const dados = req.body;
    const id = await LoginRepository.InserirLogin(dados);
    resp.send({NewId: id});
})

endpoints.post('/Login', async (req,resp) => {
    const { nome, email, senha } = req.body;

    const dados = await consultarCredenciais(nome, email, senha);

    if(!dados){
        resp.status(401).send("não encontrado")
    }

    else{
        const token = generateToken({ id: dados.id_login, role: 'user' });
        resp.json({ token });
    }
})

export default endpoints;