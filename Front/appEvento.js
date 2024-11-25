document
.getElementById("selecao_data")
.addEventListener("submit", testeCalendario)

function testeCalendario(event){
    //Previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
    event.preventDefault();

    const data_recebida = document.getElementById("data").value;

    if(!data_recebida){
        alert("Nenhuma data informada! Selecione uma data válida.")
    }else{
        console.log(data_recebida);
        alert("Data informada: "+data_recebida);
    }
}