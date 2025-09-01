create table usuario (
    id_usuario int auto_increment primary key,
    name varchar(100) not null,
    email varchar(100) not null unique,
    password varchar(255) not null,
    cpf char(11) not null unique,
    data_nascimento date not null
);

insert into usuario (name, email, password, cpf, data_nascimento) values
('João Silva', 'joao.silva@example.com', '$2b$10$MBxqcvhFahRYGrw.sPyV3./3VtWippf6CO0cKuRspOOFUS5Yi/hJ6', '16123456789', '1990-02-15'),
('Marcio Silva', 'marcio.silva@example.com', '$2b$10$MBxqcvhFahRYGrw.sPyV3./3VtWippf6CO0cKuRspOOFUS5Yi/hJ6', '16123456780', '1990-03-15'),
('Vera Silva', 'vera.silva@example.com', '$2b$10$MBxqcvhFahRYGrw.sPyV3./3VtWippf6CO0cKuRspOOFUS5Yi/hJ6', '16123456781', '1990-04-15'),
('Carlos Silva', 'carlos.silva@example.com', '$2b$10$MBxqcvhFahRYGrw.sPyV3./3VtWippf6CO0cKuRspOOFUS5Yi/hJ6', '16123456782', '1990-05-15'),
('Maria Silva', 'maria.silva@example.com', '$2b$10$MBxqcvhFahRYGrw.sPyV3./3VtWippf6CO0cKuRspOOFUS5Yi/hJ6', '16123456783', '1990-06-15'),
('Vitor Silva', 'vitor.silva@example.com', '$2b$10$MBxqcvhFahRYGrw.sPyV3./3VtWippf6CO0cKuRspOOFUS5Yi/hJ6', '16123456784', '1990-07-15'),
('Heloisa Silva', 'heloisa.silva@example.com', '$2b$10$MBxqcvhFahRYGrw.sPyV3./3VtWippf6CO0cKuRspOOFUS5Yi/hJ6', '16123456785', '1990-05-15'),
('Carla Silva', 'carla.silva@example.com', '$2b$10$MBxqcvhFahRYGrw.sPyV3./3VtWippf6CO0cKuRspOOFUS5Yi/hJ6', '16123456786', '1990-02-15'),
('Paulina Silva', 'paulina.silva@example.com', '$2b$10$MBxqcvhFahRYGrw.sPyV3./3VtWippf6CO0cKuRspOOFUS5Yi/hJ6', '16123456787', '1990-06-15'),
('Mario Silva', 'mario.silva@example.com', '$2b$10$MBxqcvhFahRYGrw.sPyV3./3VtWippf6CO0cKuRspOOFUS5Yi/hJ6', '16123456788', '1990-12-15');
	
create table organizador (
	id_organizador int auto_increment primary key,
	nome varchar(100) not null,
	email varchar(100) not null unique,
	senha varchar(50) not null,
	telefone char(11) not null
);

insert into organizador (nome, email, senha, telefone) values
('Organização ABC', 'contato@abc.com', 'senha123', '11111222333'),
('Eventos XYZ', 'info@xyz.com', 'senha123', '11222333444'),
('Festivais BR', 'contato@festbr.com', 'senha123', '11333444555'),
('Eventos GL', 'support@gl.com', 'senha123', '11444555666'),
('Eventos JQ', 'contact@jq.com', 'senha123', '11555666777');

create table evento (
    id_evento int auto_increment primary key,
    nome varchar(100) not null,
    descricao varchar(255) not null,
    data_hora datetime not null,
    local varchar(255) not null,
    fk_id_organizador int not null,
    foreign key (fk_id_organizador) references organizador(id_organizador)
);

insert into evento (nome, data_hora, local, descricao, fk_id_organizador) values
    ('Festival de Verão', '2024-12-15', 'Praia Central', 'evento de verao', '1'),
    ('Congresso de Tecnologia', '2024-11-20', 'Centro de convencoes', 'Evento de tecnologia', '2'),
    ('Show Internacional', '2024-10-30', 'Arena Principal', 'Evento internacional', '3');

create table ingresso (
    id_ingresso int auto_increment primary key,
    preco decimal(5,2) not null,
    tipo varchar(10) not null,
    fk_id_evento int not null,
    foreign key (fk_id_evento) references evento(id_evento)
);

insert into ingresso (preco, tipo, fk_id_evento) values
    (500, 'vip', '1'),
    (150, 'pista', '1'),
    (200, 'pista', '2'),
    (600, 'vip', '3'),
    (250, 'pista', '3');

create table compra(
    id_compra int auto_increment primary key,
    data_compra datetime not null,
    fk_id_usuario int not null,
    valor int not null,
    foreign key (fk_id_usuario) references usuario(id_usuario)
);

insert into compra (data_compra, fk_id_usuario, valor) values
    ("2024-11-14 19:04", 1, 850),
    ("2024-11-13 17:00", 1, 650);

create table ingresso_compra(
    id_ingresso_compra int auto_increment primary key,
    fk_id_ingresso int not null,
    foreign key (fk_id_ingresso) references ingresso(id_ingresso),
    fk_id_compra int not null,
    foreign key (fk_id_compra) references compra(id_compra)
);

insert into ingresso_compra(fk_id_compra, fk_id_ingresso) values
    (1, 4),
    (1, 5),
    (2, 1),
    (2, 2);
     
create table presenca(
    id_presenca int auto_increment primary key,
    data_hora_checkin datetime,
    fk_id_evento int not null,
    foreign key (fk_id_evento) references evento(id_evento),
    fk_id_ingresso_compra int not null,
    foreign key (fk_id_ingresso_compra) references ingresso_compra(id_ingresso_compra)
);

ALTER TABLE evento ADD imagem LONGBLOB;
ALTER TABLE evento ADD tipoImagem VARCHAR(100);