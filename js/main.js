class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.keys = {};

        this.lastTime = performance.now();
        this.accumulator = 0;
        this.fixedDt = 1 / 60;

        window.addEventListener('keydown', e => this.keys[e.key] = true);
        window.addEventListener('keyup', e => this.keys[e.key] = false);
        window.addEventListener('resize', () => this.resize(window.innerWidth, window.innerHeight));

        this.resize(window.innerWidth, window.innerHeight);

        this.draw = this.draw.bind(this);
        this.draw();
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    update(dt) {
        // ...
    }

    draw(now) {
        // handle physics
        let delta = ((now - this.lastTime) || 0) / 1000;
        this.lastTime = now;
        this.accumulator += delta;

        while (this.accumulator >= this.fixedDt) {
            this.update(this.fixedDt);
            this.accumulator -= this.fixedDt;
        }

        // draw
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(Math.sin(Date.now() / 500) * 100 + 200, Math.cos(Date.now() / 500) * 100 + 200, 50, 50);

        requestAnimationFrame(this.draw);
    }
}

const game = new Game('canvas');