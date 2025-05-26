create table `resumo_evento` (
id_evento int primary key,
total_ingressos int);


delimiter //

create trigger `atualizar_total_ingressos`
after insert on `ingresso_compra`
for each row
begin
	declare idtemp int;
    declare quant int;
    
	select i.fk_id_evento, new.quantidade into idtemp, quant 
    from ingresso i 
    where new.fk_id_ingresso = i.id_ingresso;
    
    insert into resumo_evento (id_evento, total_ingressos)  
    values (idtemp, quant) 
    on duplicate key update total_ingressos = total_ingressos + quant;
end; //

delimiter ;