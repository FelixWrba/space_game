class Player {
    velocity = new Vector();
    rotation = 0;

    constructor(pos) {
        this.pos = new Vector(pos.x, pos.y);
    }

    draw(startTime) {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rotation);

        // draw white triangle for rocket
        ctx.beginPath();
        ctx.moveTo(20, 0);
        ctx.lineTo(-20, 10);
        ctx.lineTo(-20, -10);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.fill();

        // draw rocket flame when accelerating
        if (keys['w']) {
            const gradient = ctx.createLinearGradient(-60 + (Math.sin(startTime / 100) * 5 || 0), 5, -20, 5);
            gradient.addColorStop(0, 'transparent');
            gradient.addColorStop(1, 'orange');
            ctx.fillStyle = gradient;
            ctx.fillRect(-60, -5, 40, 10);
        }

        ctx.restore();
    }

    update(dt) {
        if (keys['w']) {
            let thrust = new Vector(Math.cos(this.rotation), Math.sin(this.rotation)).mul(0.5);
            this.velocity = this.velocity.add(thrust);
        }

        if (keys['a']) {
            this.rotation -= 0.1;
        }
        if (keys['d']) {
            this.rotation += 0.1;
        }

        let nextPos = this.pos.add(this.velocity);

        // detect wall collision
        if (nextPos.x > canvas.width || nextPos.x < 0 || nextPos.y > canvas.height || nextPos.y < 0) {
            this.velocity = new Vector();
            nextPos = this.pos;
        }

        this.pos = nextPos;
    }
}