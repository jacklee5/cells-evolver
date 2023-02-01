function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    if (headless) drawHeadless();
    else drawSim();
}

function drawHeadless() {
    background(255);
    fill("black");
    text("simulation running in background", width / 2, height / 2);
}

function drawSim() {
    background(0);
    sim.render();
}