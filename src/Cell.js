const RADIUS = 10;
const TURN_SPEED = 0.1; // radians
class Cell {
    constructor(options) {
        const x = options?.x || Random.randInt(0, SIM_WIDTH);
        const y = options?.y || Random.randInt(0, SIM_HEIGHT);
        this.body = Bodies.circle(x, y, RADIUS);
        this.body.ref = this;

        this.foodToDigest = options?.foodToDigest || 0;
    }

    update() {
        this.wander();
        // wrapping logic
        if (this.x < 0) Body.setPosition(this.body, {x: SIM_WIDTH, y: this.y});
        if (this.x > SIM_WIDTH) Body.setPosition(this.body, {x: 0, y: this.y});
        if (this.y < 0) Body.setPosition(this.body, {x: this.x, y: SIM_HEIGHT});
        if (this.y > SIM_HEIGHT) Body.setPosition(this.body, {x: this.x, y: 0});
    }

    // travel in a random direction
    wander() {
        if (Random.randInt(1, 10) == 1) 
            Body.setAngularVelocity(this.body, Random.rand(-TURN_SPEED, TURN_SPEED));
        this.forward(1);
    }

    forward (dist) {
        const vel = {
            x: Math.cos(this.r) * dist,
            y: Math.sin(this.r) * dist
        }
        Body.setVelocity(this.body, vel);
    }

    backward (dist) {
        const vel = {
            x: -Math.cos(this.r) * dist,
            y: -Math.sin(this.r) * dist
        }
        Body.setVelocity(this.body, vel);
    }

    right (dist) {
        const vel = {
            x: -Math.sin(this.r) * dist,
            y: Math.cos(this.r) * dist
        }
        Body.setVelocity(this.body, vel);
    }

    left (dist) {
        const vel = {
            x: Math.sin(this.r) * dist,
            y: -Math.cos(this.r) * dist
        }
        Body.setVelocity(this.body, vel);
    }

    render() {
        fill("red");
        circle(this.x, this.y, RADIUS * 2);
        fill("blue");
        circle(this.x + Math.cos(this.r) * RADIUS, this.y + Math.sin(this.r) * RADIUS, 10);
    }

    get x() {
        return this.body.position.x;
    }

    get y() {
        return this.body.position.y;
    }

    get r() {
        return this.body.angle;
    }

    static fromObject(obj) {
        return new Cell(obj);
    }

    toObject() {
        return {
            x: this.x,
            y: this.y,
            foodToDigest: this.foodToDigest
        };
    }
}