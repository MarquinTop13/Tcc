import conexao from "./conections.js";

export async function Register(dados){
    const InserirUser = `
        insert into register (name, email, password, year)
            values
                (?,?, MD5(?), ?);
    `

    const [info] = await conexao.query(InserirUser, [
        dados.name,
        dados.email,
        dados.password,
        dados.year
    ]);

    return info.insertId;
}

export async function Login(email, senha){
    const Login = `
        select email, password
        from register
            where email = ?
                and password = MD5(?); 
    `

    const [info] = await conexao.query(Login, [email, senha]);
    return info;
}

