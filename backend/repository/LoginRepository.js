import { conexao } from "./conections.js";

export async function InserirLogin(dados){
    const User = `
        insert into register (name, email, password, year)
            values
                (?,?,MD5(?),?);
    `

    const [info] = await conexao.query(User, [
        dados.name,
        dados.email,
        dados.password,
        dados.year
    ])

    return info.insertId;
}

export async function Logar(email,senha){
    const Login = `
        select id_user, name, email, password
            from register
        where email = ? and MD5(password) = ?;
    `

    const [info] = await conexao.query(Login, [
        email, senha
    ])

    return info;
}