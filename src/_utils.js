const Random = {
    // generates a random integer between start and end
    randInt: (start, end) => {
        return Math.trunc(Math.random() * (end - start + 1) + start);
    },

    // randInt but can be a float
    rand: (start, end) => {
        return Math.random() * (end - start) + start
    }
}

const { Engine, Bodies, Body, Composite } = Matter;