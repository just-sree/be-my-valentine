const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const musicBtn = document.getElementById('musicBtn');
const hint = document.getElementById('hint');
const card = document.getElementById('card');

let noClicks = 0;

noBtn.addEventListener('mouseenter', dodgeNo);
noBtn.addEventListener('click', dodgeNo);

function dodgeNo() {
  noClicks++;
  const messages = [
    "Mannat-chan, are you sure? 🥺",
    "The Hidden Leaf believes in us 😏",
    "That button got shadow-cloned 👀",
    "C'mon, say yes dattebayo 💕",
    "This is our canon event 🍥"
  ];
  hint.textContent = messages[Math.min(noClicks - 1, messages.length - 1)];

  const x = Math.random() * 220 - 110;
  const y = Math.random() * 120 - 60;
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

yesBtn.addEventListener('click', () => {
  card.innerHTML = `
    <p class="tag">Sree ❤️ Mannat</p>
    <h1>Best. Decision. Ever.</h1>
    <p class="sub">Officially locked in for Valentine’s 💘</p>
    <p class="hint">Mannat said yes. Our ninja love arc is canon now 🍥😚</p>
  `;
  launchConfetti();
});

// simple built-in romantic music toggle (no external files)
let audioCtx;
let musicTimer;
let musicOn = false;

musicBtn.addEventListener('click', () => {
  if (!musicOn) {
    startMusic();
    musicOn = true;
    musicBtn.textContent = '🎵 Music: On';
  } else {
    stopMusic();
    musicOn = false;
    musicBtn.textContent = '🎵 Music: Off';
  }
});

function playNote(freq, duration = 0.35, gainVal = 0.04) {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(gainVal, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(gain).connect(audioCtx.destination);
  osc.start(now);
  osc.stop(now + duration);
}

function startMusic() {
  const progression = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63];
  let i = 0;
  musicTimer = setInterval(() => {
    playNote(progression[i % progression.length]);
    i++;
  }, 450);
}

function stopMusic() {
  clearInterval(musicTimer);
}

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
    c: ['#ff8a00', '#ffb347', '#6ee7ff', '#ff6b81'][Math.floor(Math.random()*4)],
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
