const connect = require("../db/connect");

module.exports = async function validateCpf(cpf, userId = null) {
  return new Promise((resolve, reject) => {
    const query = "SELECT id_usuario FROM usuario WHERE cpf = ?";
    const values = [cpf];

    if(!validateCPFMath(cpf)){
      resolve({ error:"Informe um CPF válido."})
    }
    connect.query(query, values, (err, results) => {
      if (err) {
        reject("Erro ao verificar CPF");
      } else if (results.length > 0) {
        const idDoCad = results[0].id_usuario;

        // Se um userId foi passado (update) e o CPF pertence a outro usuário, retorna erro
        if (userId && idDoCad == userId) {
          resolve(null);
        } else if (!userId) {
          resolve({ error: "CPF já cadastrado, cadastre um outro" });
        } else {
          resolve({ error: "CPF já cadastrado, atualize para outro" });
        }
      } else {
        resolve(null);
      }
    });
  });
};

function validateCPFMath(cpf){
  // Remove caracteres não numéricos
  cpf.replace(/[^\d]+/g,'');

  // Verifica se há 11 digitos e se são digitos aceitos
  if(cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  //
  const calcDigit = (base, pesoInicial) => {
    let soma = 0;
    for (let i = 0; i < base.length; i++){
      soma += parseInt(base[i]) * (pesoInicial - i);
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  }
  
  const primeiroDigito = calcDigit(cpf.substring(0, 9), 10);
  const segundoDigito = calcDigit(cpf.substring(0, 9) + primeiroDigito, 11);

  return (
    parseInt(cpf[9]) === primeiroDigito &&
    parseInt(cpf[10]) === segundoDigito
  );
}

