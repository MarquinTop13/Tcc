import { AddInfos } from "../repository/virusInfoRepository.js";
import { Router } from "express";

const endpoints = Router();

endpoints.get("/api/listarInf", async (req, resp)=>{
    try {
        const virus = await listarVirus();
        resp.send(virus);
      } catch (error) {
        resp.status(500).json({ error: "Erro ao buscar vírus", details: error });
      }
    }
)

endpoints.post("/api/virus", async (req, resp) => {
    const { nome_virus, descricao_virus, prevensao } = req.body;
    try {
        const id = await AddInfos(nome_virus, descricao_virus, prevensao);
        resp.send({ message: "Vírus adicionado com sucesso!", id });
      } catch (error) {
        resp.status(500).json({ error: "Erro ao adicionar vírus", details: error });
      }
});

export default endpoints;