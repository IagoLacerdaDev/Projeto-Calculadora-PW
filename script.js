// Todo o código ficara dentro de um EventListiner para facilitar o procedimento das funções 
// Como fiz sozinho, nao tive auxilio então pode ter algumas coisas que vao faltar, peço que compreenda isso e seja flexível.




// Não uso Var por conta de ser o pior dos tipos de variaveis

document.addEventListener("DOMContentLoaded",function(){
// Declarando as variaveis

    let ligar = document.querySelector(".ligar");
    let visor = document.querySelector("#visor");
    let botoes = document.querySelectorAll(".teclas_geral"); 
    let memoria = document.querySelector ("#lista_memoria");
    let turnOff = true; 


    turnOff.addEventListener("click", function() {
        // Esse if direto ele já entende que está questionando = true
        if (turnOff){
            // Desativar os botões
            botoes.forEach(function(desativar){
                desativar.disabled = true;
                desativar.classList.add("off")
            });
            visor.value = "";
            memoria.innerHTML = "";
            turnOff = false;

            turnOff.style.backgroundColor = "red";
        } else{
            turnOff = true;
            botoes.forEach(function(desativar){
                desativar.disabled = false;
                desativar.classList.remove("off")
            })
            ligar.style.backgroundColor = '';
            }});

})