// Seleciona o elemento com o id indicado (do formulário) e Adiciona o ouvinte de evento (submit) para capturar o envio do formulário
document
  .getElementById("formulario_registro")
  .addEventListener("submit", createUser);

  // document.addEventListener("DOMContentLoaded", getAllUsers)
  document.addEventListener("DOMContentLoaded", getAllUsersTable)
  document.addEventListener("DOMContentLoaded", getAllOrgsTable)
  // document.addEventListener("DOMContentLoaded", getEventosTable)

function createUser(event) {
  // Previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
  event.preventDefault();
  // Captura os valores dos campos do formulário
  const name = document.getElementById("nome").value;
  const cpf = document.getElementById("cpf").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("senha").value;

  // Requisição HTTP para o endpoint de cadastro de usuário
  fetch("http://10.89.240.99:5000/api/v1/user/", {
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
      // Executa a resposta de sucesso retorna ao organizador final

      //Exibe um alerta para o organizador final (front) com o nome do usuário que acabou de ser cadastrado
      alert(data.message);
      console.log(data.message);

      document.getElementById("formulario_registro").reset();
      window.location.href = "cadastro.html"
    })
    .catch((error) => {
      // Captura qualquer erro que ocorra durante o processo de requisição/resposta

      //Exibe uma mensagem de erro no front
      alert("Erro no cadastro: " + error.message);

      console.error("Erro:", error.message);
    });
}

function getAllUsers() {
  fetch("http://10.89.240.99:5000/api/v1/user/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if(response.ok){
      return response.json();
    }
    return response.json().then((err) =>{
      throw new Error(err.error);
    });
  })
      .then((data) =>{
        const userlist = document.getElementById("userlist")
        userlist.innerHTML = "";

        data.users.forEach((user) =>{
          const listItem = document.createElement("li");
          listItem.textContent = `Nome: ${user.name}, CPF: ${user.cpf}, Email: ${user.email}`
          userlist.appendChild(listItem)
        })
      })
      .catch((error) =>{
        alert("Erro ao obter usuários: " + error.message)
        console.log("Erro: ", error.message)
      })
}

function getAllUsersTable() {
  fetch("http://10.89.240.99:5000/api/v1/user/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if(response.ok){
      return response.json();
    }
    return response.json().then((err) =>{
      throw new Error(err.error);
    });
  })
      .then((data) =>{
        const userlist = document.getElementById("user-list-tabela");
        // Limpa a lista antes de adicionar novos itens
        userlist.innerHTML = ""
        // Verifica se há usuários retornados e os adiciona a tabela
        data.users.forEach((organizador) =>{
          // Cria uma nova linha
          const tr = document.createElement("tr");
          // Cria células para Nome, CPF e E-mail
          const tdNome = document.createElement("td");
          tdNome.textContent = organizador.name;
          tr.appendChild(tdNome);
          const tdCpf = document.createElement("td");
          tdCpf.textContent = organizador.cpf;
          tr.appendChild(tdCpf);
          const tdEmail = document.createElement("td");
          tdEmail.textContent = organizador.email;
          tr.appendChild(tdEmail);

          userlist.appendChild(tr);
        })
      })
      .catch((error) =>{
        alert("Erro ao obter usuários: " + error.message);
        console.error("Erro:", error.message)
      })
}

function getAllOrgsTable(){
  fetch("http://10.89.240.99:5000/api/v1/organizador/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if(response.ok){
      return response.json();
    }
    return response.json().then((err) =>{
      throw new Error(err.error);
    });
  })
      .then((data) =>{
        const orglist = document.getElementById("org-list-tabela");
        // Limpa a lista antes de adicionar novos itens
        orglist.innerHTML = ""
        // Verifica se há usuários retornados e os adiciona a tabela
        data.organizadores.forEach((organizador) =>{
          // Cria uma nova linha
          const tr = document.createElement("tr");
          // Cria células para Nome, CPF e E-mail

          const tdNome = document.createElement("td");
          tdNome.textContent = organizador.nome;
          tr.appendChild(tdNome);

          const tdFone = document.createElement("td");
          tdFone.textContent = organizador.telefone;
          tr.appendChild(tdFone);

          const tdEmail = document.createElement("td");
          tdEmail.textContent = organizador.email;
          tr.appendChild(tdEmail);

          orglist.appendChild(tr);
        })
      })
      .catch((error) =>{
        alert("Erro ao obter organizadores: " + error.message);
        console.error("Erro:", error.message)
      })
}

function getEventosTable(){
  fetch("http://10.89.240.99:5000/api/v1/evento/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    if(response.ok){
      return response.json();
    }
    return response.json().then((err) =>{
      throw new Error(err.error);
    });
  })
      .then((data) =>{
        const eventolist = document.getElementById("evento_tabela");
        // Limpa a lista antes de adicionar novos itens
        eventolist.innerHTML = "";
        // Verifica se há eventos retornados e os adiciona a tabela
        data.eventos.forEach((evento) =>{
          // Cria uma nova linha
          const tr = document.createElement("tr");

          // Cria células para valores retornados
          const tdNome = document.createElement("td");
          tdNome.textContent = evento.nome;
          tr.appendChild(tdNome);

          const tdDesc = document.createElement("td");
          tdDesc.textContent = evento.descricao;
          tr.appendChild(tdDesc);

          const tdData = document.createElement("td");
          tdData.textContent = evento.data_hora;
          tr.appendChild(tdData);

          const tdLocal = document.createElement("td");
          tdLocal.textContent = evento.local;
          tr.appendChild(tdLocal);

          const tdFKOrg = document.createElement("td");
          tdFKOrg.textContent = evento.fk_id_organizador;
          tr.appendChild(tdFKOrg);

          eventolist.appendChild(tr);
        })
      })
      .catch((error) =>{
        alert("Erro ao obter eventos: " + error.message);
        console.error("Erro:", error.message)
      })
}