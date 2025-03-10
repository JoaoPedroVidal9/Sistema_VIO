const connect = require('../db/connect');
module.exports = async function validateCpf(cpf, id){
    const query = `select id_usuario from usuario where cpf = ?`;
     connect.query(query,[cpf],(err,results)=>{
        if(err){
            //deu erro na bagaça
        }else if(results.length>0){
            const idDoCadastrado = results[0].id_usuario;
            if(id && idDoCadastrado !== id){
                return {error:'CPF já cadastrado por outro usuário'}
            }else if(!id){
                return{error:'CPF já cadastrado.'}
            }
        }else{
            return false
        }
    })
}