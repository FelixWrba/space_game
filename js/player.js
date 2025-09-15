class Player {
    speed = 500;

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, 50, 50);
    }

    update(dt) {
        if(keys['w']) {
            this.y -= this.speed * dt;
        }
        if(keys['s']) {
            this.y += this.speed * dt;
        }

        if(keys['a']) {
            this.x -= this.speed * dt;
        }
        if(keys['d']) {
            this.x += this.speed * dt;
        }
    }
}