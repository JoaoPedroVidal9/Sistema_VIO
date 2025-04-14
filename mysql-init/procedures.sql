delimiter //

create procedure registrar_compra(
    in p_id_usuario int,
    in p_id_ingresso int,
    in p_quantidade int
)
begin
    declare v_id_compra int;

    insert into compra (data_compra, fk_id_usuario) 
    values (now(), p_id_usuario);

    set v_id_compra = last_insert_id();

    insert into ingresso_compra (fk_id_compra, fk_id_ingresso, quantidade)
    values (v_id_compra, p_id_ingresso, p_quantidade);

end; //

delimiter ;

{/*Mudança de procedure:*/}

delimiter //

create procedure total_ingressos_usuario(
    in p_id_usuario int,
    out p_total_ingressos int
)
begin

    set p_total_ingressos = 0;

    select coalesce(sum(ic.quantidade),0)
    into p_total_ingressos
    from ingresso_compra ic
    join compra c on ic.fk_id_compra = c.id_compra
    where c.fk_id_usuario = p_id_usuario;

end; //

delimiter ;

show procedure status where db = 'vio_vidal';

set @total = 0;

call total_ingressos_usuario(2,@total);

{/*Mudança de Procedure:*/}

delimiter //

create procedure registrar_presenca(
    in p_id_compra int,
    in p_id_evento int
)
begin

    insert into presenca (data_hora_checkin, fk_id_evento, fk_id_compra)
    values (now(), p_id_evento, p_id_compra);
end; //

delimiter ;

-- procedure para resumo do usuario
delimiter $$
create procedure resumo_usuario(in pid int)
begin
    declare nome varchar(100);
    declare email varchar(100);
    declare totalrs decimal(10,2);
    declare faixa varchar(20);

    -- buscar o nome e o email do usuario

    select u.name, u.email into nome, email from usuario u where u.id_usuario = pid;

    -- pegar a quantidade de dinheiro gasto

    set totalrs = calcula_total_gasto(pid);

    -- olhar a faixa etaria

    set faixa = buscar_faixa_etaria_usuario(pid);

    -- Mostra os dados formatados
    select coalesce(nome, "Usuário Inexistente") as "Nome Usuário", coalesce(email, "Usuário Inexistente") as "E-mail Usuário", totalrs as "Total Gasto", faixa as "Faixa Etária";
end; $$
delimiter ;

-- Exercicio 3 da tarefa

delimiter $$
create procedure resumo_evento(in ide int)
begin
    declare nome varchar(100);
    declare data date;
    declare vendidos int;
    declare total decimal(10,2);

    select e.nome, CAST(e.data_hora as date) into nome, data from evento e where e.id_evento = ide;

    set vendidos = total_ingressos_vendidos(ide);
    set total = renda_total_evento(ide);

    select coalesce(nome,"Evento Inexistente") as "Nome do Evento", coalesce(data,"Evento Inexistente") as "Data do Evento", coalesce(vendidos,0) as "Ingressos Vendidos", coalesce(total,0) as "Total Arrecadado";
end; $$
delimiter ;