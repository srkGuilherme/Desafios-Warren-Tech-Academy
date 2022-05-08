const input = document.getElementById("input");
const lista = document.getElementById("listaId");
const alerta = document.getElementById("alertaId");
const alertaNumero = document.getElementById("alertaNumero");
const botaoCalcular = document.getElementById("botaoCalcular");
let listaDeNumeros = [];

function isOdd(value) {
  if (value % 2 == 0) return false;
  else {
    return true;
  }
}
function reverso(value) {
  return parseInt(value.split("").reverse().join(""));
}

function limpar() {
  lista.innerHTML = "";
  listaDeNumeros = [];
}
function lastNumber(value, reverse) {
  if (value % 10 && reverse % 10) {
    return true;
  } else {
    return false;
  }
}
function alertaToast(e, tempo) {
  e.classList.add("alertaShow");
  setTimeout(() => {
    e.classList.remove("alertaShow");
  }, tempo);
}

function avisoCalcular() {
  if (input.value > 9999) {
    botaoCalcular.classList.add("calcularBloqueado");
    botaoCalcular.disabled = true;
    console.log("botao desabilitado");
    alertaToast(alertaNumero, 5000);
    setTimeout(() => {
      botaoCalcular.disabled = false;
      console.log("botao habilitado");
      botaoCalcular.classList.remove("calcularBloqueado");
    }, 5000);
  }
}

function calcular() {
  limpar();
  const valor = input.value;

  if (valor == 0) {
    alertaToast(alerta, 2500);
  } else {
    for (i = 0; i <= valor; i++) {
      let iReverso = reverso(i.toString());
      let somaReverso = i + iReverso;
      let checkOdd = isOdd(somaReverso);

      if (checkOdd && lastNumber(i, iReverso) && somaReverso < 1000000) {
        listaDeNumeros.push(somaReverso);
      }
    }
    console.log(listaDeNumeros);
    for (i = 0; i < listaDeNumeros.length; i++) {
      lista.innerHTML += "<li>" + listaDeNumeros[i] + "</li>";
    }
  }
  input.value = null;
}
