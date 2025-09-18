CREATE TABLE Fabricante (
    id_fabricante INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    pais_origem VARCHAR(50),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Produto (
    id_produto INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    id_fabricante INT NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_fabricante) REFERENCES Fabricante(id_fabricante)
    ON DELETE CASCADE  
);

CREATE TABLE ItemPedido (
    id_item INT PRIMARY KEY AUTO_INCREMENT,
    id_produto INT NOT NULL,
    id_pedido INT NOT NULL,  
    quantidade INT DEFAULT 1,
    data_pedido DATE,
    FOREIGN KEY (id_produto) REFERENCES Produto(id_produto)
    ON DELETE CASCADE  
);

DELETE FROM Fabricante
WHERE id_fabricante NOT IN (
    SELECT DISTINCT id_fabricante
    FROM Produto
    WHERE preco > 2000
);