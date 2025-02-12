let listaDeNumeros = [];
let numeroLimite = 50;
let numero = gerarNumero();
let tentativas = 1;
function alterarCampo (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
        } else {
            console.log("Web Speech API não suportada neste navegador.");
        }
    }
    
function mensagemInicial () {
alterarCampo ('h1', 'Bem vindo ao jogo do número secreto');
alterarCampo ('p', 'chute um número entre 1 e 100');
}

mensagemInicial ();
function verificarChute () {
    let chute = document.querySelector('input').value;
    if(numero == chute) {
        alterarCampo ('h1', 'Parabéns!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}`;
        alterarCampo ('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numero) {
            alterarCampo ('p', 'O número é menor');
        } else {
            alterarCampo ('p', 'O número é maior');
        }
    }
    tentativas++;
    limparCampo();
}   

function gerarNumero () {
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let qntdElementos = listaDeNumeros.length;
   if (qntdElementos == numeroLimite) {
    listaDeNumeros = [];
   }
   if(listaDeNumeros.includes(numeroEscolhido)) {
    return gerarNumero();
   } else {
    listaDeNumeros.push(numeroEscolhido);
    console.log(listaDeNumeros);
    return numeroEscolhido;
   }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo () {
    mensagemInicial ();
    numero = gerarNumero();
    tentativas = 1;
    limparCampo ();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
