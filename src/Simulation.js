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
        this.cells = state.cells.map(cell => new Cell(cell));
        this.food = state.food;
        Composite.add(this.engine.world, this.cells.map(cell => cell.body));
    }

    update = () => {
        this.tick++;

        this.cells.forEach(cell => cell.update()); // update cells

        // spawn food
        if (this.tick % FOOD_SPAWN_RATE == 0) {
            for (let i = 0; i < FOOD_SPAWN_AMOUNT; i++) {
                this.food.push({
                    x: Random.randInt(0, SIM_WIDTH),
                    y: Random.randInt(0, SIM_HEIGHT),
                    amount: Random.randInt(0, 10 * 2)
                });
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
        this.food.forEach(food => circle(food.x, food.y, food.amount));
    }

    getState = () => {
        return {
            tick: this.tick,
            cells: this.cells.map(cell => cell.toObject()),
            food: this.food
        }
    }
}