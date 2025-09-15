const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const keys = {};

let lastTime = performance.now();
let accumulator = 0;
let fixedDt = 1 / 60;

window.addEventListener('keydown', e => keys[e.key] = true);
window.addEventListener('keyup', e => keys[e.key] = false);
window.addEventListener('resize', () => resizeGame(window.innerWidth, window.innerHeight));

resizeGame(window.innerWidth, window.innerHeight);

const player = new Player(50, 50);

function resizeGame(width, height) {
    canvas.width = width;
    canvas.height = height;
}

function update(dt) {
    player.update(dt);
}

(function draw(now) {
    // handle physics
    let delta = ((now - lastTime) || 0) / 1000;
    lastTime = now;
    accumulator += delta;

    while (accumulator >= fixedDt) {
        update(fixedDt);
        accumulator -= fixedDt;
    }

    // draw
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.draw();

    requestAnimationFrame(draw);
})();