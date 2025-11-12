import mysql from "mysql2/promise"

const conexao = await mysql.createConnection({
    local: 'localhost',
    user: 'root',
    password: '1234',
    database: 'Tcc'
});

export { conexao };

/*
BANCO MGS
const conexao = await mysql.createConnection({
    local: 'localhost',        
    user: 'Mgs',
    password: 'Potato10!',
    database: 'Mgs'
});

BANCO FREI
const conexao = await mysql.createConnection({
    local: 'localhost',
    user: 'root',
    password: '1234',
    database: 'Tcc'
});

*/
