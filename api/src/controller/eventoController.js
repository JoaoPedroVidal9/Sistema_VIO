const connect = require("../db/connect");
module.exports = class eventoController {
  static async createEvento(req, res) {
    const { nome, descricao, data_hora, local, fk_id_organizador } = req.body;

    if (!nome || !descricao || !data_hora || !local || !fk_id_organizador) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else {
      // Construção da query INSERT
      const query = `INSERT INTO evento(nome, descricao, data_hora, local, fk_id_organizador) VALUES (?, ?, ?, ?, ?);`;
      const values = [nome, descricao, data_hora, local, fk_id_organizador];
      // Executando a query INSERT
      try {
        connect.query(query, values, function (err) {
          if (err) {
            console.log(err);
            console.log(err.code);
            return res.status(500).json({ error: "Erro Interno Do Servidor" });
          } else {
            return res
              .status(201)
              .json({ message: "Evento criado com sucesso" });
          }
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
    }
  }

  static async getAllEventos(req, res) {
    const query = `SELECT * FROM evento`;

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }

        // Transformando a data no Horário de Greenwich(GMT), para Horário de Brasília (GMT-3)
        if (results[0]) {
          const dateAgora = new Date(results[0].data_hora);
          console.log(results[0].data_hora);
          console.log();
          console.log("Data:", dateAgora.toLocaleDateString(),"Horário:", dateAgora.toLocaleTimeString(),"Ambos:", dateAgora.toLocaleString());
          return res.status(200).json({
            message: "Mostrando eventos: ",
            eventos: results,
            diahora: dateAgora,
          });
        }else{
        return res.status(200).json({
          message: "Mostrando eventos: ",
          eventos: results,
        });
      }
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Um erro foi encontrado." });
    }
  }

  static async updateEvento(req, res) {
    //Desestrutura e recupera os dados enviados via corpo da requisição
    const { nome, descricao, data_hora, local, id_evento } = req.body;
    //Validar se todos os campos foram preenchidos
    if ((!nome, !descricao, !data_hora, !local, !id_evento)) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    const query = `UPDATE evento SET nome=?, descricao=?, data_hora=?, local=? WHERE id_evento = ?`;
    const values = [nome, descricao, data_hora, local, id_evento];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Evento não encontrado." });
        }
        return res
          .status(200)
          .json({ message: "Evento atualizado com sucesso." });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro Interno de Servidor" });
    }
  }

  static async deleteEvento(req, res) {
    const eventoId = req.params.id;

    const query = `DELETE FROM evento WHERE id_evento = ?`;
    const values = [eventoId];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Evento não encontrado." });
        }
        return res
          .status(200)
          .json({ message: "Evento excluído com sucesso." });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro Interno de Servidor" });
    }
  }
};
