class Planet {
    constructor(pos, radius, mass, color) {
        this.pos = pos;
        this.radius = radius;
        this.mass = mass;
        this.color = color;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}