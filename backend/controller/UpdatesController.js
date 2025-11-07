import * as UpdateRepository from "../repository/UpdatesRepository.js"
import {Router} from "express";
const endpoint = Router();

endpoint.post('/InserirUpdate', async (req,res) => {
    const dados = req.body;
    
    try{
        const table = await UpdateRepository.InserirUpdate(dados.date, dados.text);
        res.send({dados: table})
    } catch(error){
        res.send({error})
    }
})

endpoint.get('/ListarUpdates', async (req,res) => {
    try{
        const updates = await UpdateRepository.ListarUpdates();
        res.send({updates});
    } catch(error){
        res.send({error})
    }
})

export default endpoint;