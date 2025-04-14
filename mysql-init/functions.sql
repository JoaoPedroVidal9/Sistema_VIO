-- {/*Mudança para function*/}

delimiter $$
create function calcula_idade(datanascimento date)
returns int
deterministic
contains SQL
begin
    declare idade int;
    set idade = timestampdiff(year, datanascimento, curdate());
    return idade;
end; $$
delimiter ;

show create function calcula_idade;

select name, calcula_idade(data_nascimento) as idade from usuario;

-- {/*Mudança de function*/}

delimiter $$
create function status_sistema()
returns varchar(50)
no sql
begin   
    return 'Sistema operando normalmente';
end; $$
delimiter ;

select status_sistema();

-- {/*Mudança de function*/}

delimiter $$
create function total_compras_usuario(id_usuario int)
returns int
reads sql data 
begin
    declare total int;

    select count(*) into total
    from compra
    where id_usuario = compra.fk_id_usuario;

    return total;
end; $$
delimiter ;

select name, total_compras_usuario(id_usuario) as compras from usuario;

-- {/*Mudança de function*/}

create table log_evento (
    id_log int AUTO_INCREMENT PRIMARY KEY,
    mensagem varchar(255),
    data_log datetime default current_timestamp
);

delimiter $$
create function registrar_log_evento(texto varchar(255))
returns varchar(50)
deterministic
modifies sql data
begin
    insert into log_evento(mensagem)
    values (texto);

    return "log inserido com sucesso";
end; $$
delimiter ;

show variables like 'log_bin_trust_function_creators';

set global log_bin_trust_function_creators = 1;


-- {/*Mudança de function*/}
delimiter $$
create function msg_boas_vindas(nome_usuario varchar(100))
returns varchar(255)
deterministic
contains sql
begin
    declare msg varchar(255);
    set msg = concat('Olá, ', nome_usuario, '! Seja bem vindo(a) ao Sistema VIO.');
    return msg;
end; $$
delimiter ;

-- {/*14/04/25*/}

select routine_name from information_schema.routines where routine_type = 'FUNCTION' and routine_schema = 'vio_vidal';

-- maior de idade
delimiter $$

create function is_maior_idade(nometeste int)
returns boolean
not deterministic
contains SQL
begin
    declare idade int;
    declare dumpdata varchar(25);

    select data_nascimento into dumpdata from usuario where id_usuario = nometeste; 
    
    set idade = calcula_idade(dumpdata);

    return idade >= 18;
end; $$

delimiter ;

-- categorizar usuarios por faixa etaria


delimiter $$
create function faixa_etaria(data_nascimento date)
returns varchar(20)
not deterministic
contains sql
begin
    declare idade int;

    set idade = calcula_idade(data_nascimento);

    if idade < 18 then 
        return "menor de idade";
    elseif idade < 60 then
        return "adulto";
    elseif NOT isnull(idade) then
        return "idoso";
    else 
        return "Não tem idade";
    end if;
end; $$
delimiter ;

--agrupar usuarios por faixa etaria

select faixa_etaria(data_nascimento) as "Faixa Etária", count(*) as quantidade from usuario group by faixa_etaria(data_nascimento);

--identificar uma faixa etára específica

select name as nome from usuario where faixa_etaria(data_nascimento) = "adulto";

-- calcular média de idade

delimiter $$
create function media_idade()
returns decimal(5,2)
not deterministic 
reads sql data 
begin
    declare media decimal(5,2);

    -- calculo da media das idades
    select avg(timestampdiff(year, data_nascimento, curdate())) into media from usuario;

    return ifnull(media, 0);
end; $$
delimiter ;

select "A média de idade dos clientes é maior que trinta" as resultado where media_idade()>30;

-- Exercício Direcionado
-- Calculo do total gasto por um usuario
delimiter $$
create function calcula_total_gasto(p_id_usuario int)
returns decimal(10,2)
not deterministic
reads sql data
begin
    declare total decimal(10,2);
    select sum(i.preco * ic.quantidade) into total from compra c
    JOIN ingresso_compra ic on c.id_compra = ic.fk_id_compra
    JOIN ingresso i on ic.fk_id_ingresso = i.id_ingresso
    where c.fk_id_usuario = p_id_usuario
    group by c.fk_id_usuario;
    return ifnull(total,0);
end; $$
delimiter ;

-- buscar a faixa etária de um usuario
delimiter $$
create function buscar_faixa_etaria_usuario(pid int)
returns varchar(20)
not deterministic
reads sql data
begin
    declare nascimento date;
    declare faixa varchar(20);

    select data_nascimento into nascimento from usuario where id_usuario = pid;
    select faixa_etaria(nascimento) into faixa;
    return faixa;
end; $$ 
delimiter ;

-- Exercicio 1 da atividade
delimiter $$
create function total_ingressos_vendidos(ide int)
returns int
not deterministic
reads sql data
begin
    declare result int;

    select coalesce(sum(quantidade),0) into result from ingresso_compra 
    join ingresso on fk_id_ingresso = id_ingresso
    where fk_id_evento = ide;
    return result;
end; $$
delimiter ;

-- exercicio 2 da atividade
delimiter $$
create function renda_total_evento(ide int)
returns decimal(10,2)
not deterministic
reads sql data
begin
    declare totalmoney decimal(10,2);

    select coalesce(sum(quantidade * preco),0) into totalmoney from ingresso_compra
    join ingresso on fk_id_ingresso = id_ingresso
    where fk_id_evento = ide;

    return totalmoney;
end; $$
delimiter ;
