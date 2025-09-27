class Planet {
    constructor(pos, radius, mass, color) {
        this.pos = pos;
        this.radius = radius;
        this.mass = mass;
        this.color = color;
    }

    draw(cameraOffset) {
        ctx.shadowColor = this.color;
        ctx.shadowColor = ctx.shadowColor + 'ee';
        ctx.shadowBlur = '120';

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x - cameraOffset.x, this.pos.y - cameraOffset.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}