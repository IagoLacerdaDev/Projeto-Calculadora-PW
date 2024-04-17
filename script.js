document.addEventListener("DOMContentLoaded", function() {
    let memoria = document.querySelector("#guardar_memoria");
    let ligar = document.querySelector("#ligar");
    let visor = document.querySelector("#visor input");
    let memoriaValor = 0; // Inicializa o valor da memória
    let turnOff = false;
    let botoes;

    inicializarCalculadora();

    ligar.addEventListener("click", function() {
        if (turnOff) {
            desativarCalculadora();
        } else {
            ativarCalculadora();
        }
        turnOff = !turnOff;
    });

    function inicializarCalculadora() {
        ativarCalculadora();
    }

    function desativarCalculadora() {
        botoes = document.querySelectorAll(".teclas_geral");
        botoes.forEach(function(botao) {
            botao.disabled = true;
            botao.classList.add("off");
            ligar.classList.add("botaoDesligado");
            botao.removeEventListener("click", realizarOperacao);
        });
        visor.value = "";
        if (memoria !== null) {
            memoria.innerHTML = "";
        }
    }

    function ativarCalculadora() {
        botoes = document.querySelectorAll(".teclas_geral");
        botoes.forEach(function(botao) {
            botao.disabled = false;
            botao.classList.remove("off");
            ligar.style.backgroundColor = "";
            botao.addEventListener("click", realizarOperacao);
        });
    }

    function realizarOperacao() {
        let valor = this.value;

        if (valor === "C") {
            visor.value = "";
        } else if (valor === "CE") {
            visor.value = visor.value.slice(0, -1);
        } else if (valor === "=") {
            try {
                let resultado = calcularExpressao(visor.value);
                if (!isFinite(resultado) || isNaN(resultado)) {
                    throw new Error("Error");
                }
                visor.value = Number(resultado.toFixed(8)); // Arredonda para oito casas decimais
                if (memoria !== null) {
                    if (memoria.innerHTML === "") {
                        memoria.innerHTML += "<li style='margin-top: 20px; list-style: none;'></li>";
                    }
                    memoria.innerHTML += "<li>" + visor.value + "</li>";
                }
            } catch (error) {
                visor.value = "Error";
                desativarBotoesExcetoC();
            }
        } else if (valor === "ON/OFF") { // Se a mensagem de erro estiver sendo exibida
            if (turnOff) {
                desativarCalculadora();
            } else {
                ativarCalculadora();
            }
            turnOff = !turnOff;
        } else if (visor.value === "Error") { // Se a mensagem de erro estiver sendo exibida
            if (valor === "C") { // Permitir o botão C para limpar a mensagem de erro
                visor.value = "";
                ativarCalculadora(); // Restaura o comportamento padrão dos botões
            }
        } else if (valor === "%") {
            visor.value = eval(visor.value) / 100;
        } else if (valor === "x²") {
            visor.value = Math.pow(eval(visor.value), 2);
        } else if (valor === "√") {
            if (!visor.value) return; // Não fazer nada se o visor estiver vazio
            visor.value = Math.sqrt(parseFloat(visor.value)).toFixed(8); // Arredonda para oito casas decimais
        } else if (valor === "1/x") {
            if (!visor.value) return; // Não fazer nada se o visor estiver vazio
            visor.value = (1 / parseFloat(visor.value)).toFixed(8); // Arredonda para oito casas decimais
        } else if (valor === "+/-") {
            visor.value = parseFloat(visor.value) * -1;
        } else if (valor === "←") {
            visor.value = visor.value.slice(0, -1);
        } else if (valor === "M+") {
            memoriaValor += parseFloat(visor.value);
        } else if (valor === "M-") {
            memoriaValor -= parseFloat(visor.value);
        } else if (valor === "RM") {
            visor.value = memoriaValor.toFixed(8);
        } else if (valor === "CLM") {
            memoriaValor = 0;
        } else {
            visor.value += valor;
        }
    }

    function desativarBotoesExcetoC() {
        botoes.forEach(function(botao) {
            if (botao.value !== "C") {
                botao.disabled = true;
                botao.classList.add("off");
            }
        });
    }

    function calcularExpressao(expressao) {
        let expressaoSegura = expressao.replace(/[^-()\d/*+.]/g, '');
        return eval(expressaoSegura);
    }
});
