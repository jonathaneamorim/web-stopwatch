// Captura de elementos
var iniciarPausar = document.querySelector('#iniciarPausar');
var valueButton = iniciarPausar.value; // Captura o valor do botão

// Captura os botões de zerar e limpar
var zerarDataBotao = document.querySelector('#zerar');
var limparRegistroBotao = document.querySelector('#limpar');

// Captura os elementos do display
var segundo_element = document.querySelector("#segundo");
var minuto_element = document.querySelector("#minuto");
var hora_element = document.querySelector("#hora");

// Captura o elemento do registro
var registro = document.querySelector('#list-registro');

// Instancia o cronometro utilizando a classe Date();
var cronometroTime = new Date();

// Define o Id do intervalo inicial como null
var intervalId = null;

// ----- Funções -----

// Função para inserir um 0 a frente do numero caso necessário
// A função utiliza um operador Condicional ternário, que realiza IFs de uma linha
// Já possuia conhecimento desse método de IF em outras linguagens porem foi pesquisado a sintaxe no JS
// Fonte: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Conditional_operator
function adicionarZero(tempo) {
    return (tempo < 10) ? '0'+tempo : tempo;
}

function alterarTempoDisplay() {
    segundo_element.innerHTML = adicionarZero(cronometroTime.getSeconds());
    minuto_element.innerHTML = adicionarZero(cronometroTime.getMinutes());
    hora_element.innerHTML = adicionarZero(cronometroTime.getHours());
}

// Função para zerar a Data
function zerarData() {
    cronometroTime.setSeconds(0);
    cronometroTime.setMinutes(0);
    cronometroTime.setHours(0);

    alterarTempoDisplay();
}

// Função para iniciar o cronômetro 
function startCronometro() {
    cronometroTime.setSeconds(cronometroTime.getSeconds() + 1);
    alterarTempoDisplay();
}

// Função para inserir o registro
function registrarTempo() {
    var text = adicionarZero(cronometroTime.getHours())
                            +':'
                            +adicionarZero(cronometroTime.getMinutes())
                            +':'
                            +adicionarZero(cronometroTime.getSeconds());
    registro.innerHTML += `<li class="list-group-item text-center">${text}</li>`;
}

function iniciarCronometro() {
    intervalId = setInterval(startCronometro, 1000);
    valueButton = 'pausar';
    iniciarPausar.innerHTML = 'Pausar';
}

function pararCronometro() {
    clearInterval(intervalId);
    intervalId = null;
    valueButton = 'iniciar';
    iniciarPausar.innerHTML = 'Iniciar';
}

function limparRegistro() {
    registro.innerHTML = '';
}

// ----- Eventos de click do programa -----
iniciarPausar.addEventListener('click', () => {
    if(valueButton == 'iniciar') {
        iniciarCronometro();
    } else {
        registrarTempo();
        pararCronometro();
    }
})

iniciarPausar.addEventListener('keypress', () => {
    if(valueButton == 'iniciar') {
        iniciarCronometro();
    } else {
        registrarTempo();
        pararCronometro();
    }
})

zerarDataBotao.addEventListener('click', () => {
    zerarData();
    pararCronometro();
})

limparRegistroBotao.addEventListener('click', () => {
    limparRegistro();
})

// Para evitar o uso de "onload" no html foi pesquisado uma forma de realizar a ação através do JS
// Referência (https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event)
document.addEventListener('DOMContentLoaded', () => {
    zerarData();
})

// Captura informações de teclas clicadas no documento
// O event contem informações sobre o evento disparado no keydown incluse a tecla pressionada
// fonte: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    switch(keyName) {
        case "s":
            if(valueButton == 'iniciar') {
                iniciarCronometro();
            } else {
                registrarTempo();
                pararCronometro();
            }
            break;
        case "c":
            limparRegistro();
            break;
        case "r":
            zerarData();
            pararCronometro();
            break
    }
});

// Diferentes soluções que poderia até funcionar
// ---------- Alterando apenas o registro ----------
// function registrarTempoTESTE() {
//     var teste = cronometroTime;
//     teste.setSeconds(cronometroTime.getSeconds() - 1);
//     var text = adicionarZero(teste.getHours())
//                             +':'
//                             +adicionarZero(teste.getMinutes())
//                             +':'
//                             +adicionarZero(teste.getSeconds());
//     registro.innerHTML += `<li class="list-group-item text-center">${text}</li>`;
//}

// ---------- Atrasando a parada do cronômetro ----------
// iniciarPausar.addEventListener('click', () => {
//     if(valueButton == 'iniciar') {
//         intervalId = setInterval(startCronometro, 1000);
//         valueButton = 'pausar';
//         iniciarPausar.innerHTML = 'Pausar';
//     } else {
//         registrarTempo();
//         setTimeout(() => {
//             // Referência de pausa do crônometro (https://developer.mozilla.org/pt-BR/docs/Web/API/Window/setInterval)
//             // Havia duvidas com o clearInterval
//             clearInterval(intervalId);

//             intervalId = null;
//             valueButton = 'iniciar';
//             iniciarPausar.innerHTML = 'Iniciar';
//         })
//     }
// })


// ---------- Criando um cronômetro com apenas a lógica do JS (o mais adequado) ----------
// function startCronometroTeste() {
//     // Seria ideial criar variáveis fora da função para ter o controle do tempo
//     segundo_var++;

//     segundo_element.innerHTML = adicionarZero(segundo_var);
//     minuto_element.innerHTML = adicionarZero(minuto_var);
//     hora_element.innerHTML = adicionarZero(hora_var);
//     if(segundo_var == 60) {
//         segundo_var = 0;
//         minuto_var++;
//         segundo_element.innerHTML = adicionarZero(segundo_var);
//          minuto_element.innerHTML = adicionarZero(minuto_var);
//          hora_element.innerHTML = adicionarZero(hora_var);
//     }
//     if(minuto_var == 60) {
//         minuto_var = 0;
//         hora_var++;
//         segundo_element.innerHTML = adicionarZero(segundo_var);
//          minuto_element.innerHTML = adicionarZero(minuto_var);
//          hora_element.innerHTML = adicionarZero(hora_var);
//     }
// }
// function registrarTempoTESTE() {
//     var text = adicionarZero(hora_var)
//                 +':'
//                 +adicionarZero(minuto_var)
//                 +':'
//                 +adicionarZero(segundo_var);

//     registro.innerHTML += `<li class="list-group-item text-center">${text}</li>`;
// }