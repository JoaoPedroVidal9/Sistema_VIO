const connect = require("../db/connect");

module.exports = async function validateCpf(cpf, userId = null) {
  return new Promise((resolve, reject) => {
    const query = "SELECT id_usuario FROM usuario WHERE cpf = ?";
    const values = [cpf];

    connect.query(query, values, (err, results) => {
      if (err) {
        reject("Erro ao verificar CPF");
      } else if (results.length > 0) {
        const cpfCadastrado = results[0].id_usuario;

        // Se um userId foi passado (update) e o CPF pertence a outro usuário, retorna erro
        if (userId && cpfCadastrado !== userId) {
          resolve({ error: "CPF já cadastrado, atualize para outro" });
        } else if (!userId) {
          resolve({ error: "CPF já cadastrado, cadastre um outro" });
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  });
};

