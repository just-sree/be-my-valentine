const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const hint = document.getElementById('hint');
const card = document.getElementById('card');

let noClicks = 0;

noBtn.addEventListener('mouseenter', dodgeNo);
noBtn.addEventListener('click', dodgeNo);

function dodgeNo() {
  noClicks++;
  const messages = [
    "You sure? 🥺",
    "Think again 😏",
    "That button seems broken 👀",
    "C'mon, say yes 💕",
    "You know you want to 😌"
  ];
  hint.textContent = messages[Math.min(noClicks - 1, messages.length - 1)];

  const x = Math.random() * 220 - 110;
  const y = Math.random() * 120 - 60;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

yesBtn.addEventListener('click', () => {
  card.innerHTML = `
    <p class="tag">YAYYYYY 💞</p>
    <h1>Best. Decision. Ever.</h1>
    <p class="sub">Officially locked in for Valentine’s 💘</p>
    <p class="hint">Now screenshot this and send me a kiss 😚</p>
  `;
  launchConfetti();
});

const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let pieces = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
addEventListener('resize', resize);
resize();

function launchConfetti() {
  pieces = Array.from({ length: 180 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.4,
    r: 2 + Math.random() * 4,
    v: 1 + Math.random() * 3,
    c: ['#ff5da2', '#ffd166', '#6ee7ff', '#b794ff'][Math.floor(Math.random()*4)],
    a: Math.random() * Math.PI * 2
  }));
  requestAnimationFrame(tick);
}

function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  pieces.forEach(p => {
    p.y += p.v;
    p.x += Math.sin(p.a += 0.05);
    ctx.fillStyle = p.c;
    ctx.fillRect(p.x, p.y, p.r, p.r * 1.6);
  });
  pieces = pieces.filter(p => p.y < canvas.height + 30);
  if (pieces.length) requestAnimationFrame(tick);
}
