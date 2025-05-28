CREATE EVENT IF NOT EXISTS arquivar_compras_antigas
    ON SCHEDULE EVERY 1 hour
    STARTS CURRENT_TIMESTAMP + INTERVAL 5 MINUTE
    ON COMPLETION PRESERVE
    ENABLE
DO 
    INSERT INTO historico_compra (id_compra, data_compra, id_usuario) 
    SELECT id_compra, data_compra, fk_id_usuario from compra
    WHERE data_compra < NOW() - interval 6 MONTH;