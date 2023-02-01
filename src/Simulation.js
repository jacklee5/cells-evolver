class Simulation {
    constructor() {
        this.tick = 0;
        this.cells = [];
        this.food = [];
        this.interval = null;
        this.engine = Engine.create({
            gravity: {
                x: 0,
                y: 0
            }
        }); 
        Events.on(this.engine, "collisionActive", ({pairs}) => {
            pairs.forEach(pair => {
                // food eating
                // assuming that food is always body B because it is created later
                if (pair.bodyB.ref instanceof Food && pair.bodyA.ref instanceof Cell) {
                    const cell = pair.bodyA.ref;
                    const food = pair.bodyB.ref;
                    const eaten = Math.min(food.amount, EAT_RATE);

                    cell.foodToDigest += eaten;
                    food.consume(eaten);

                    if (food.amount == 0) { // remove food if empty
                        Composite.remove(this.engine.world, food.body);
                        this.food = this.food.filter(el => el !== food);
                    }
                }
            });
        });
    }

    init = () => {
        // spawn initial cells
        for (let i = 0; i < INITIAL_CELLS; i++) {
            const newCell = new Cell();
            this.cells.push(newCell);
            Composite.add(this.engine.world, newCell.body);
        }
    }

    restore = (state) => {
        this.tick = state.tick;
        this.cells = state.cells.map(cell => Cell.fromObject(cell));
        this.food = state.food.map(food => Food.fromObject(food));
        Composite.add(this.engine.world, this.cells.map(cell => cell.body));
    }

    update = () => {
        this.tick++;

        this.cells.forEach(cell => cell.update()); // update cells

        // spawn food
        if (this.tick % FOOD_SPAWN_RATE == 0) {
            for (let i = 0; i < FOOD_SPAWN_AMOUNT; i++) {
                const newFood = new Food();
                this.food.push(newFood);
                Composite.add(this.engine.world, newFood.body);
            }
        }

        Engine.update(this.engine, TICK_SPEED); // update world
    }

    start = () => {
        this.interval = setInterval(this.update, TICK_SPEED);
    }

    pause = () => {
        clearInterval(this.interval);
    }

    render = () => {
        // draw cells
        this.cells.forEach(cell => cell.render());

        // draw food
        fill("orange");
        this.food.forEach(food => food.render());
    }

    getState = () => {
        return {
            tick: this.tick,
            cells: this.cells.map(cell => cell.toObject()),
            food: this.food.map(food => food.toObject())
        }
    }
}