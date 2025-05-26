const grid = document.getElementById("grid");
const mensaje = document.getElementById("mensaje");

// Genera tabla ASCII
const tabla = document.querySelector(".ascii-table table");
for (let i = 65; i <= 90; i++) {
  const letra = String.fromCharCode(i);
  const bin = i.toString(2).padStart(8, "0");
  const fila = `<tr><td>${letra}</td><td>${i}</td><td>${bin}</td></tr>`;
  tabla.insertAdjacentHTML("beforeend", fila);
}

// Configuración del juego
const filas = 6;
const columnas = 8;
const cantidadMinas = 10;

// Letras válidas para formar con binarios
const letrasValidas = [];
for (let i = 65; i <= 90; i++) letrasValidas.push(i.toString(2).padStart(8, "0"));

// Genera el tablero
let tablero = [];

function crearTablero() {
  tablero = [];
  let minasColocadas = 0;

  for (let i = 0; i < filas * columnas; i++) {
    tablero.push({
      binario: "",
      mina: false,
      revelado: false
    });
  }

  while (minasColocadas < cantidadMinas) {
    let idx = Math.floor(Math.random() * tablero.length);
    if (!tablero[idx].mina) {
      tablero[idx].mina = true;
      tablero[idx].binario = generarBinarioInvalido();
      minasColocadas++;
    }
  }

  for (let i = 0; i < tablero.length; i++) {
    if (!tablero[i].mina) {
      tablero[i].binario = letrasValidas[Math.floor(Math.random() * letrasValidas.length)];
    }
  }
}

function generarBinarioInvalido() {
  let num;
  do {
    num = Math.floor(Math.random() * 256);
  } while (num >= 65 && num <= 90);
  return num.toString(2).padStart(8, "0");
}

function dibujarTablero() {
  grid.innerHTML = "";
  for (let i = 0; i < tablero.length; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = i;
    cell.textContent = "?";
    cell.addEventListener("click", revelar);
    grid.appendChild(cell);
  }
}

function revelar(e) {
  const index = e.target.dataset.index;
  const celda = tablero[index];
  if (celda.revelado) return;

  celda.revelado = true;
  e.target.classList.add("revealed");
  e.target.textContent = celda.binario;

  if (celda.mina) {
    e.target.classList.add("mine");
    mensaje.textContent = "¡Perdiste! Tocaste una mina.";
    revelarTodo();
  } else {
    const letra = String.fromCharCode(parseInt(celda.binario, 2));
    mensaje.textContent = `Letra: ${letra}`;
  }
}

function revelarTodo() {
  const celdas = document.querySelectorAll(".cell");
  celdas.forEach((cell, i) => {
    const data = tablero[i];
    if (!data.revelado) {
      cell.textContent = data.binario;
      cell.classList.add("revealed");
      if (data.mina) cell.classList.add("mine");
    }
  });
}

// Inicializar juego
crearTablero();
dibujarTablero();
