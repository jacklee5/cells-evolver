const TICK_SPEED = 1000;
class Simulation {
    constructor(state) {
        this.state = state || {
            tick: 0
        }
        this.interval = null;
    }

    update = () => {
        this.state.tick++;
    }

    start = () => {
        this.interval = setInterval(this.update, TICK_SPEED);
    }

    pause = () => {
        clearInterval(this.interval);
    }

    getState = () => {
        return this.state;
    }
}