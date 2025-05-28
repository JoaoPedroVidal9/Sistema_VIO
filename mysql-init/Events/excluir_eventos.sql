CREATE EVENT IF NOT EXISTS excluir_eventos_antigos
    ON schedule every 1 WEEK
    STARTS CURRENT_TIMESTAMP + INTERVAL 5 MINUTE
    ON COMPLETION PRESERVE
    ENABLE
DO
    DELETE FROM evento WHERE data_hora < now() - interval 1 year;