// Acessa o objeto "document" que representa a página html

document
  // Seleciona o elemento com o id indicado (do formulário)
  .getElementById("formulario_registro")
  // Adiciona o ouvinte de evento (submit) para capturar o envio do formulário
  .addEventListener("submit", function (event) {
    // Previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
    event.preventDefault();
    // Captura os valores dos campos do formulário
    const name = document.getElementById("nome");
    const cpf = document.getElementById("cpf");
    const email = document.getElementById("email");
    const password = document.getElementById("senha");

    // Requisição HTTP para o endpoint de cadastro de usuário
    fetch("http://localhost:5000/api/v1/user/", {
      // Realiza uma chamada HTTP para o servidor (a rota definida)
      method: "POST",
      headers: {
        // A requisição será em formato JSON
        "Content-Type": application / JSON,
      },
      // Transforma os dados do formulário em uma string JSON para serem enviados no corpo da requisição
      body: JSON.stringify({ name, cpf, password, email }),
    });
  });
