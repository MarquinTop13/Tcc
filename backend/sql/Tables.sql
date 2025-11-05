drop database Tcc;
create database Tcc;
use Tcc;

create table cadastro(
    id_cadastro int primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(100) not null,
    palavra varchar(100) not null,
    maxArquivo int default (5),
    maxLink int default (5),
    pago boolean default (0),
    senhaGerada varchar(100),
    idade date not null
);

create table tb_login(
    id_login int primary key auto_increment,
    id_cadastro int,
    nome varchar(100)not null,
    email varchar(100) not null,
    senha varchar(100) not null,
    foreign key(id_cadastro) references cadastro(id_cadastro)
);


create table tb_support (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idUser int,
    msgUser varchar(255),
    opcaoSelecionada varchar(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key(idUser) references cadastro(id_cadastro)
);