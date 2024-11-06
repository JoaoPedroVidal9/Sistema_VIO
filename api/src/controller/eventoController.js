const connect = require("../db/connect");
module.exports = class userController {
  static async createEvento(req, res) {
    const {nome, descricao, data_hora, local, fk_id_organizador} = req.body;

    if ( !nome || !descricao || !data_hora || !local || !fk_id_organizador) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if () {
      return res.status(400).json({
        error: "CPF inválido. Deve conter exatamente 11 dígitos numéricos",
      });
    } else if () {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    } else {
      // Construção da query INSERT
      const query = `INSERT INTO evento(nome, descricao, data_hora, local, fk_id_organizador) VALUES ('?', '?', '?', '?', '?');`;
      const values = [nome, descricao, data_hora, local, fk_id_organizador];
      // Executando a query INSERT
      try {
        connect.query(query, values, function (err) {
          if (err) {
            console.log(err);
            console.log(err.code);
            if (err.code === "ER_DUP_ENTRY") {
              return res
                .status(400)
                .json({ error: "O email já está vinculado a outro usuário" });
            } else {
              return res
                .status(500)
                .json({ error: "Erro Interno Do Servidor" });
            }
          } else {
            return res
              .status(201)
              .json({ message: "Usuário criado com sucesso" });
          }
        });
      } catch (error) {
        console.error(error);
        return res
        .status(500)
        .json({ error: "Erro interno do servidor" });
      }
    }
  }

  static async getAllUsers(req, res) {
    const query = `SELECT * FROM usuario`;

    try {
      connect.query(query, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }
        return res
          .status(200)
          .json({
            message: "Mostrando usuários: ",
            users: results,
          });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Um erro foi encontrado." });
    }
  }

  static async updateUser(req, res) {
    //Desestrutura e recupera os dados enviados via corpo da requisição
    const { cpf, email, password, name, id} = req.body;
    //Validar se todos os campos foram preenchidos
    if (!cpf || !email || !password || !name || !id) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    const query = `UPDATE usuario SET name=?, email=?, password=?, cpf=? WHERE id_usuario = ?`;
    const values = [name, email, password, cpf, id];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ error: "E-mail já cadastrado por outro usuário." });
          } else {
            console.error(err);
            return res.status(500).json({ error: "Erro Interno do Servidor" });
          }
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não encontrado." });
        }
        return res
          .status(200)
          .json({ message: "Usuário atualizado com sucesso." });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro Interno de Servidor" });
    }

  }

  static async deleteUser(req, res) {
    const userId = req.params.id;

    const query = `DELETE FROM usuario WHERE id_usuario = ?`;
    const values = [userId];
    try {
      connect.query(query, values, function (err, results) {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro Interno do Servidor" });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não encontrado." });
        }
        return res
          .status(200)
          .json({ message: "Usuário excluído com sucesso." });
      });
    } catch (error) {
      console.error("Erro ao executar a consulta:", error);
      return res.status(500).json({ error: "Erro Interno de Servidor" });
    }
  }
};
