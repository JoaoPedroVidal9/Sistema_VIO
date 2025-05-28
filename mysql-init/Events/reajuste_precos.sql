CREATE EVENT IF NOT EXISTS reajuste_precos_eventos_proximos
    ON SCHEDULE EVERY 1 DAY 
    STARTS CURRENT_TIMESTAMP + INTERVAL 1 MINUTE
    ON COMPLETION PRESERVE
    ENABLE
DO
    UPDATE INGRESSO SET preco = preco * 1.1
    WHERE fk_id_evento in(
        SELECT id_evento from evento
        where data_hora BETWEEN NOW() AND NOW() + INTERVAL 1 WEEK
    );


insert into evento (id_evento, nome, descricao, data_hora, local, fk_id_organizador) 
values (2002, "Evento proximo", "teste", NOW() + interval 5 day, "franca-sp", 1);

insert into ingresso (preco, tipo, fk_id_evento) values (200, "vip", 2002);
