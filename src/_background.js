importScripts("../lib/matter.min.js", "./_utils.js", "./_constants.js", "./Simulation.js", "./Cell.js", "./Food.js");

let sim = null;

const sendMessage = (event, data) => {
    postMessage({event, data});
}

const handlers = {
    "blur": data => {
        sim = new Simulation();
        sim.restore(data);
        if (!DEV)
            sim.start();
        console.log("starting simulation headless");
    },
    "focus": sync => {
        if (!sim) return;
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