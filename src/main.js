const worker = new Worker("./src/background.js");
let sim = new Simulation();
let headless = false; // true if running in background
let lastSync = 0;

const sendMessage = (event, data) => {
    worker.postMessage({event, data});
}
const workerHandlers = {
    "sync": data => {
        if (data.sync !== lastSync) return;
        sim = new Simulation(data.state);
        sim.start();
        headless = false;
        console.log("resuming");
    }
}
worker.onmessage = e => {
    const { event, data } = e.data;
    workerHandlers[event](data);
}

sim.start();
window.addEventListener("blur", () => {
    sim.pause();
    headless = true;
    sendMessage("blur", sim.getState());
});
window.addEventListener("focus", () => {
    sendMessage("focus", ++lastSync);
    console.log("attempting to resume");
});