import * as RegisterRepository from '../repository/loginRepository.js'
import * as Token from '../utils/jwt.js';
import Router from 'express';
const endpoints = Router();

endpoints.post('/login',async (req,resp) => {
    const dados = req.body;
    const id = await RegisterRepository.Register(dados);
    resp.send({NewId: id});
})

endpoints.get('/register', async (req,resp) => {
    const email = req.body.email;
    const password = req.body.password;

    const login = await RegisterRepository.Login(email,senha);
        if(!login){
            resp.status(401).send({Error: 'Login Invalido'})
        }
        else{
            let token = Token.generateToken(login);
            resp.send({
                SeuToken: token
            })
        }
})

export default endpoints;