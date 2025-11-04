create database Tcc;
drop database Tcc;
create database Tcc;
use Tcc;

create table cadastro(
    id_cadastro int primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(100) not null,
    palavra varchar(100) not null,
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
    msgUser varchar(255) not null,
    opcaoSelecionada varchar(255) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    foreign key(idUser) references cadastro(id_cadastro)
);
delete from tb_support
where idUser = 1;
select * from tb_support;
