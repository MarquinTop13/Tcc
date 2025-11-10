import { conexao } from "./conections.js"

export async function AddInfos(nome_virus, descricao_virus, prevensao){
    const Ordem =`
    insert into InfosVirus(nome_virus, descricao_virus, prevensao)
    values (?,?,?)
    `
    const [res] = await conexao.query(Ordem, [ nome_virus, descricao_virus, prevensao])
    return res.insertId;
}

export async function listarVirus(){
    const Ordem =`
    selct *from InfosVirus
    `
    const[res] = conexao.query(Ordem);
    return res;
}