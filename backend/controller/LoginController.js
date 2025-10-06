import * as LoginRepository from '../repository/LoginRepository.js'
import { Router } from "express";
import generateToken from '../utils/jwt.js';
import getAuthentication from '../utils/jwt.js'
const endpoints = Router();

endpoints.post('/InserirLogin', async (req,resp) => {
    const dados = req.body;
    const id = await LoginRepository.InserirLogin(dados);
    resp.send({NewId: id});
})

endpoints.get('/Login', async (req,resp) => {
    const email = req.body.email;
    const password = req.body.password;

    const dados = await LoginRepository.Logar(email,password);

    if(!dados){
        resp.status(401).send("Achei N")
    }

    else{
        let token = generateToken(dados);
        resp.send({token: token});
    }
})

export default endpoints;