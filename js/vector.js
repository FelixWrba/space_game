class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    sub(v) {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    mul(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    div(scalar) {
        return new Vector(this.x / scalar, this.y / scalar);
    }

    // length
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // make length = 1
    normalize() {
        const m = this.mag();
        return m === 0 ? new Vector(0, 0) : this.div(m);
    }

    // angle between self and v
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    rotate(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new Vector(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
    }
}