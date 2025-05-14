const bit = document.getElementById('bit');
const objetivo = document.getElementById('objetivo');
const obstaculos = document.querySelectorAll('.obstaculo');

let posX = 0;
let posY = 0;

document.addEventListener('keydown', (e) => {
  let nuevaX = posX;
  let nuevaY = posY;

  if (e.key === "ArrowRight") nuevaX += 20;
  if (e.key === "ArrowLeft") nuevaX -= 20;
  if (e.key === "ArrowUp") nuevaY -= 20;
  if (e.key === "ArrowDown") nuevaY += 20;

  // Evitar que salga del área de juego
  if (nuevaX < 0 || nuevaY < 0 || nuevaX > 200 || nuevaY > 200) return;

  // Colisión con obstáculos
  for (let obs of obstaculos) {
    const obsX = parseInt(obs.style.left);
    const obsY = parseInt(obs.style.top);

    if (nuevaX === obsX && nuevaY === obsY) {
      return; // No se mueve si choca
    }
  }

  posX = nuevaX;
  posY = nuevaY;
  bit.style.left = posX + "px";
  bit.style.top = posY + "px";

  const objX = parseInt(objetivo.style.left);
  const objY = parseInt(objetivo.style.top);

  if (posX === objX && posY === objY) {
    setTimeout(() => {
      alert("¡Ganaste! Bit llegó al portal.");
    }, 100);
  }
});
