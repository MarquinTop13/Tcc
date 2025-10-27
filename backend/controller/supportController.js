import * as Support from "../repository/supportRepository.js"; 
import { getAuthentication } from "../utils/jwt.js"; 
import Router from "express"; 
const endpoints = Router(); 

endpoints.post("/UserHelp1", getAuthentication(), async (req, resp) => { 
    const msgUser = req.body.msg;
    const idUser = req.headers;
    
    try { 
        const id = await Support.MensagemUser(idUser, msgUser); 
        resp.send({ mensagemId: id }); 
    } catch (error) { 
        resp.status(500).send({ error: error.message }); 
    } }); 
    
endpoints.post("/UserHelp2", async (req, resp) => { 
    const opcaoEscolhida = req.body.opcao; 
    const Resposta = await Support.SuportePronto(opcaoEscolhida); 
    resp.send({ Mensagem: Resposta }); 
});

export default endpoints;