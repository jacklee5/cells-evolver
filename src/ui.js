function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    if (headless) drawPaused();
    else drawSim();
}

function drawPaused() {
    background(255);
    fill("black");
    text("simulation running in background", width / 2, height / 2);
}

function drawSim() {
    background(0);
    fill("red");
    text(sim.state.tick, width / 2, height / 2);
}