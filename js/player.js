class Player {
    rotation = 0;

    constructor(pos, startingVelocity = new Vector()) {
        this.pos = new Vector(pos.x, pos.y);
        this.velocity = startingVelocity;
    }

    draw(startTime) {
        this.drawOrbitalLine();

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

        // speed overlay
        ctx.font = '12px monospace'
        ctx.fillStyle = 'white';
        ctx.fillText(`Speed: ${this.velocity.mag().toFixed(1)}`, 20, 20);
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

        // add gravity to velocity
        this.velocity = this.velocity.add(this.getGravityAcceleration(this.pos, earth.pos));

        let nextPos = this.getNextPos();

        // detect wall collision
        if (nextPos.x > canvas.width || nextPos.x < 0 || nextPos.y > canvas.height || nextPos.y < 0) {
            this.velocity = new Vector();
            nextPos = this.pos;
        }

        // detect earth collision
        if (nextPos.sub(earth.pos).mag() < earth.radius) {
            this.velocity = new Vector();
            nextPos = this.pos;
        }

        this.pos = nextPos;
    }

    drawOrbitalLine() {
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        for (let i = 1; i < 200; i++) {
            let nextPos = this.getNextPos(i);
            ctx.lineTo(nextPos.x, nextPos.y);
        }
        ctx.stroke();
    }

    getGravityAcceleration(playerPos, earthPos) {
        let relativePos = playerPos.sub(earthPos);

        return relativePos.normalize().mul(-0.1);
    }

    getNextPos(frames = 1) {
        if (frames === 1) {
            return this.pos.add(this.velocity);
        }

        let nextPos = this.pos;
        let nextVel = this.velocity;

        for (let i = 1; i <= frames; i++) {
            let currentPos = nextPos;
            let gravity = this.getGravityAcceleration(currentPos, earth.pos)
            let currentVel = nextVel.add(gravity);

            nextPos = currentPos.add(currentVel);
            nextVel = currentVel;
        }

        return nextPos;
    }
}