const express = require("express"); //Importa o módulo Express
const cors = require("cors");
require("dotenv-safe").config();
const jwt = require("jsonwebtoken");
const testConnect = require("./db/testConnect");

class AppController {
  //Define uma classe para organizar a lógica da aplicação
  constructor() {
    this.express = express(); //Cria uma nova instância do Express dentro da classe
    this.middlewares(); //Chama o método middlewares para configurar os middlewares
    this.routes(); //Chama o método routes para definir as rotas da API
    testConnect(); //Chama o método testConnect para checar a conexão com o MySQL
  }

  middlewares() {
    //Permite que a aplicação receba dados no formato JSON nas requisições
    this.express.use(express.json());
    this.express.use(cors());
  }

  routes() {
    const apiRoutes = require("./routes/apiRoutes");
    this.express.use("/api/v1/", apiRoutes); // URL BASE <- http://10.89.240.75:5000/api/v1/
  }
}

//Exporta a instância do Express configurada, tornando-a acessível em outros arquivos
module.exports = new AppController().express;
