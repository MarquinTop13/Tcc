import { listarMensagens, buscarMensagem, salvarResposta } from "../repository/AdemirRepository.js";

export async function getSupport(req, res) {
  try {
    const data = await listarMensagens();
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getSupportById(req, res) {
  try {
    const data = await buscarMensagem(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function responderSupport(req, res) {
  try {
    const { idSupport, idAdmin, resposta } = req.body;
    if (!idSupport || !idAdmin || !resposta)
      return res.status(400).json({ msg: "Campos incompletos" });

    await salvarResposta(idSupport, idAdmin, resposta);
    res.json({ msg: "Resposta enviada" });
  } catch (err) {
    res.status(500).json(err);
  }
}
