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
        return ("Preencha todos os campos!");
    } 
    
    if(!(email.includes("@"))){
        return ("Formato errado de email!");
    }

    if(aniversario[2] !== "/" || aniversario[5] !== "/" || aniversario.length !== 10){
        return ("Formato errado de data!");
    }

    if((telefone.includes("_"))){
        return("Formato errado de telefone!");
    }
    
    return "";
}