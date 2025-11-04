import * as Support from "../repository/supportRepository.js"; 
import { getAuthentication, verifyToken } from "../utils/jwt.js"; 
import Router from "express"; 
const endpoints = Router(); 

endpoints.post("/UserHelp", async (req, resp) => { 
    const {tokenInserido, msg, opcao} = req.body;
    const dadosToken = verifyToken(tokenInserido)
    
    try {
        const idUser = dadosToken.id;
        const resposta = await Support.MensagemUser(idUser, msg, opcao); 
        resp.send({ mensagemId: resposta }); 
    } catch (error) { 
        resp.status(500).send({ error: error }); 
    } }); 
    

export default endpoints;