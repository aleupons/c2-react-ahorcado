// Variables globales
const urlApi = "http://localhost:3001/palabras";
let palabraSecreta;
let palabra;
let nFallos = 0;
const maxFallos = 11;

// Elementos del DOM
const inputLetra = document.querySelector(".letra");
const letrasUsadasElemento = document.querySelector(".letras-usadas");
const ahorcadoElemento = document.querySelector(".ahorcado");
const palabraElemento = document.querySelector(".palabra");
const mensajeGanar = document.querySelector(".ganar");
const mensajePerder = document.querySelector(".perder");

// Obtenemos las palabras
const getPalabra = async () => {
  const response = await fetch(urlApi);
  const { lista } = await response.json();
  palabraSecreta = getPalabraAleatoria(lista);
  return palabraSecreta;
};

const getPalabraAleatoria = (palabras) => {
  const posicionAleatoria = Math.floor(Math.random() * palabras.length);
  return palabras[posicionAleatoria];
};

const pintaHuecos = (palabra) => {
  for (const letra of palabra) {
    const nuevoHueco = document.createElement("li");
    palabraElemento.append(nuevoHueco);
  }
};

inputLetra.addEventListener("input", (e) => {
  const letra = e.target.value;
  setTimeout(() => {
    e.target.value = "";
  }, 500);
  comprobarLetra(letra);
});

const comprobarLetra = (letra) => {
  letra = letra.toUpperCase();
  anyadeLetraUsada(letra);
  if (palabraSecreta.toUpperCase().includes(letra)) {
    acierto(letra);
  } else {
    fallo();
  }
};

const anyadeLetraUsada = (letra) => {
  const nuevaLetraElemento = document.createElement("li");
  nuevaLetraElemento.textContent = letra;
  letrasUsadasElemento.append(nuevaLetraElemento);
};

const acierto = (letraAcertada) => {
  palabraSecreta.split("").forEach((letra, i) => {
    if (letra.toUpperCase() === letraAcertada) {
      const hueco = palabraElemento.querySelector(`:nth-child(${i + 1})`);
      hueco.textContent = letraAcertada;
    }
  });
  const letrasAcertadas = [...palabraElemento.querySelectorAll("li")].map(
    (letraElemento) => letraElemento.textContent
  );
  if (letrasAcertadas.join("") === palabraSecreta.toUpperCase()) {
    console.log("Has ganado");
    inputLetra.disabled = true;
  }
};

const fallo = () => {
  document.querySelector(`.stage${++nFallos}`).classList.add("on");
  if (nFallos === maxFallos) {
    console.log("Has perdido");
    inputLetra.disabled = true;
  }
};

getPalabra().then((palabra) => {
  pintaHuecos(palabra);
});
