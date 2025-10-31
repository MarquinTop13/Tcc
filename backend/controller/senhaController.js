import * as SenhaRepository from "../repository/passwordRepository.js";

import { Router } from "express";

const endpoint = Router();

endpoint.post('/RecuperarSenha', async (req, resp) => {
    const { nome, email, palavra, senha } = req.body;

    if (!nome || !email || !palavra || !senha) {
        return resp.status(400).send({
            error: "Dados incompletos",
            message: "Todos os campos (nome, email, palavra, senha) são obrigatórios",
        });
    }

    try {
        const infoUser = await SenhaRepository.InfoConta({ nome, email, palavra });

        if (infoUser.length > 0) {
            const user = infoUser[0];

            if (nome === user.nome && email === user.email && palavra === user.palavra) {
                const id = await SenhaRepository.RecuperarSenha(senha, email, nome);

                resp.status(200).send({
                    message: "Senha alterada com sucesso!"
                });
            }
            else {
                resp.status(401).send({
                    error: "Dados de verificação incorretos",
                    message: "Nome, email ou palavra-chave não correspondem"
                });
            }
        }
        else {
            resp.status(404).send({
                error: "Dados não encontrado",
                message: "Não foi encontrada nenhuma conta ou dados"
            });
        }
    }
    catch (error) {
        resp.status(500).send({
            message: "Não foi possível processar a solicitação",
            error: "Erro interno do servidor",
        });
    }
});

endpoint.post('/InfoUser', async (req, resp) => {
    const { nome } = req.body;
    console.log(nome);
    const buscarNome = await SenhaRepository.InfoConta2(nome);
    console.log(buscarNome);
    if (buscarNome.nome === nome) {
        resp.send({buscarNome});
    }
})

export default endpoint;