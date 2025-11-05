import * as ArchiverRepository from "../repository/ArchiverRepository.js"
import {Router} from "express"

const endpoint = Router();

endpoint.post('/VerificarArquivo', async (req,resp) => {
    const {arquivo} = req.body;
    const RespostaGemini = await ArchiverRepository.enviarMensagem(arquivo);
    resp.send({Resposta: RespostaGemini})
})

export default endpoint;