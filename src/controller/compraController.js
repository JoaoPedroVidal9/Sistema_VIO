const connect = require("../db/connect");
module.exports = class compraController {
  static async registrarCompraSimples(req, res) {
    const { id_usuario, id_ingresso, quantidade } = req.body;

    if (!id_usuario || !id_ingresso || !quantidade) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    const values = [id_usuario, id_ingresso, quantidade];
    console.log("Values: " + values);

    const query = `CALL registrar_compra(?, ?, ?);`;

    try {
      connect.query(query, values, (err, result) => {
        if (err) {
          console.log(err);
          console.log(err.code);
          return res
            .status(500)
            .json({ error: "Erro interno Do servidor: " + err.message });
        } else {
          return res.status(201).json({
            message: "Compra registrada com sucesso via procedure!",
            dados: { id_usuario, id_ingresso, quantidade },
          });
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro Interno do Servidor" });
    }
  }

  static registrarCompra(req, res) {
    const { id_usuario, ingressos } = req.body;

    console.log("Body:", id_usuario, ingressos);

    const query = `INSERT INTO compra (data_compra, fk_id_usuario) VALUES (NOW(), ?)`;
    const values = [id_usuario];

    connect.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        console.log(err.code);
        return res
          .status(500)
          .json({ error: "Erro ao criar a compra no sistema!" });
      } else {
        const id_compra = result.insertId;
        console.log("Compra criada com o ID:", id_compra);

        let index = 0;

        function processarIngressos() {
          if (index >= ingressos.length) {
            return res.status(201).json({
              message: "Compra realizada com sucesso!",
              id_compra,
              ingressos,
            });
          }
          const ingresso = ingressos[index];

          connect.query(
            `call registrar_compra2(?, ?, ?);`,
            [ingresso.id_ingresso, id_compra, ingresso.quantidade],
            (err) => {
              if (err) {
                console.log(err);
                console.log(err.code);
                return res
                  .status(500)
                  .json({
                    error: `Erro ao registrar ingresso ${index + 1}`,
                    detalhes: err.message,
                  });
              }
              index++;
              processarIngressos();
            }
          );
        }
        processarIngressos();
      }
    });
  }
};
