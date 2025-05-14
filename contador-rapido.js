let ordenActual = 1;
let puntos = 0;
const numerosDiv = document.getElementById("numeros");
const mensajeDiv = document.getElementById("mensaje");
const puntosDiv = document.getElementById("puntos");

function mezclar(array) {
  return array.sort(() => Math.random() - 0.5);
}

function crearNumeros() {
  const numeros = [1, 2, 3, 4, 5];
  const mezclados = mezclar(numeros);

  numerosDiv.innerHTML = "";
  mezclados.forEach(num => {
    const btn = document.createElement("button");
    btn.textContent = num;
    btn.classList.add("boton");
    btn.addEventListener("click", () => verificarNumero(num));
    numerosDiv.appendChild(btn);
  });

  mensajeDiv.textContent = "";
  ordenActual = 1;
}

function verificarNumero(num) {
  if (num === ordenActual) {
    ordenActual++;
    if (ordenActual > 5) {
      puntos++;
      mensajeDiv.textContent = "✅ ¡Bien hecho!";
      mensajeDiv.style.color = "green";
      puntosDiv.textContent = `Puntos: ${puntos}`;
      setTimeout(crearNumeros, 1000);
    }
  } else {
    mensajeDiv.textContent = "❌ Te equivocaste. Empezá otra vez.";
    mensajeDiv.style.color = "red";
    setTimeout(crearNumeros, 1000);
  }
}

crearNumeros();
