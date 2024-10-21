// Seleciona o elemento com o id indicado (do formulário) e Adiciona o ouvinte de evento (submit) para capturar o envio do formulário
document.getElementById("formulario_registro").addEventListener("submit", createUser);
function createUser(event) {
  // Previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
  event.preventDefault();
  // Captura os valores dos campos do formulário
  const name = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

  // Requisição HTTP para o endpoint de cadastro de usuário
  fetch("http://10.89.240.145:5000/api/v1/user/", {
    // Realiza uma chamada HTTP para o servidor (a rota definida)
    method: "POST",
    headers: {
      // A requisição será em formato JSON
      "Content-Type": "application/json",
    },
    // Transforma os dados do formulário em uma string JSON para serem enviados no corpo da requisição
    body: JSON.stringify({ name, cpf, password, email }),
  })
    .then((response) => {
      // Tratamento da resposta do servidor/API
      if (response.ok) {
        // Verifica se a resposta foi bem sucedida (status 2xx)
        return response.json();
      }
      // Convertendo o erro em formato json
      return response.json().then((err) => {
        // Mensagem retornada do servidor, acessada pela chave 'error'
        throw new Error(err.error);
      });
    }) // Fechamento de then(response)
    .then((data) => {
      // Executa a resposta de sucesso retorna ao usuario final

      //Exibe um alerta para o usuario final (front) com o nome do usuário que acabou de ser cadastrado
      alert(data.message);
      console.log(data.message);

      document.getElementById("formulario_registro").reset();
    })
    .catch((error) => {
      // Captura qualquer erro que ocorra durante o processo de requisição/resposta

      //Exibe uma mensagem de erro no front
      alert("Erro no cadastro: " + error.message);

      console.error("Erro:", error.message);
    });
}
