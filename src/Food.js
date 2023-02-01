class Food {
    constructor(options) { // options: x, y, amount
        const x = options?.x || Random.randInt(0, SIM_WIDTH);
        const y = options?.y || Random.randInt(0, SIM_HEIGHT);
        const amount = options?.amount || Random.randInt(0, FOOD_SIZE);
        this.body = Bodies.circle(x, y, amount, {isSensor: false, isStatic: true});
        this.body.ref = this;
    }

    consume(amount) {
        const scaleFactor = (this.amount - amount) / this.amount;
        Body.scale(this.body, scaleFactor, scaleFactor);
    }

    get x() {
        return this.body.position.x;
    }

    get y() {
        return this.body.position.y;
    }

    get amount() {
        return this.body.circleRadius * this.body.circleRadius;
    }

    render() {
        fill("orange");
        circle(this.x, this.y, this.body.circleRadius * 2);
    }

    toObject() {
        return {
            x: this.x,
            y: this.y,
            amount: this.amount
        }
    }

    static fromObject(obj) {
        return new Food(obj);
    }
}