// Criando o fundo com estrelas e estrelas cadentes
const canvas = document.getElementById('estrela-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const estrelas = [];
const estrelasCadentes = [];

function estrela() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    alpha: Math.random(),
    delta: Math.random() * 0.02
  };
}

function estrelaCadente() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height / 2,
    length: Math.random() * 80 + 10,
    speed: Math.random() * 10 + 6,
    angle: Math.PI / 4,
    alpha: 1
  };
}

for (let i = 0; i < 150; i++) {
  estrelas.push(estrela());
}

function desenharEstrelas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Estrelas normais
  for (let e of estrelas) {
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${e.alpha})`;
    ctx.fill();

    e.alpha += e.delta;
    if (e.alpha <= 0 || e.alpha >= 1) {
      e.delta = -e.delta;
    }
  }

  // Estrelas cadentes
  for (let i = estrelasCadentes.length - 1; i >= 0; i--) {
    const star = estrelasCadentes[i];

    ctx.strokeStyle = `rgba(255,255,255,${star.alpha})`;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(star.x, star.y);
    ctx.lineTo(
      star.x + star.length * Math.cos(star.angle),
      star.y + star.length * Math.sin(star.angle)
    );
    ctx.stroke();

    star.x += star.speed * Math.cos(star.angle);
    star.y += star.speed * Math.sin(star.angle);
    star.alpha -= 0.02;

    if (star.alpha <= 0) {
      estrelasCadentes.splice(i, 1);
    }
  }

  if (Math.random() < 0.01) {
    estrelasCadentes.push(estrelaCadente());
  }

  requestAnimationFrame(desenharEstrelas);
}

desenharEstrelas();