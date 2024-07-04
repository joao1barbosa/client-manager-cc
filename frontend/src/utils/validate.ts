// @ts-nocheck

export function isFormValidated() {
    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const email = document.getElementById("email").value;
    const aniversario = document.getElementById("aniversario").value;
    const telefone = document.getElementById("telefone").value;

    if( 
        !nome || !sobrenome || !email || !aniversario || !telefone
    ){
        alert("Preencha todos os campos!");
        return false;
    } 
    
    if(!(email.includes("@"))){
        alert("Formato errado de email!");
        return false;
    }
    
    if(aniversario[2] !== "/" || aniversario[5] !== "/" || aniversario.length !== 10){
        alert("Formato errado de data!");
        return false;
    }

    if((telefone.includes("_"))){
        alert("Formato errado de telefone!");
        return false;
    }
    
    return true;
}