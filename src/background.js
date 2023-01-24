importScripts("./sim.js");

let sim = null;
const sendMessage = (event, data) => {
    postMessage({event, data});
}
const handlers = {
    "blur": data => {
        sim = new Simulation(data);
        sim.start();
        console.log("starting simulation headless");
    },
    "focus": sync => {
        sim.pause();
        sendMessage("sync", {
            sync: sync,
            state: sim.getState()
        });
    }
}

onmessage = e => {
    let { event, data } = e.data;
    handlers[event](data);
}