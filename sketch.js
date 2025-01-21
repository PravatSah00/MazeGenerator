let maze = null;
let button = null;
let creating = false;

function setup() {
    createCanvas(1000, 600);

    maze = new Maze(20, 20, width - 40, height - 40, 60, 90);

    button = document.createElement("button");
    button.innerText = "CreateMaze";
    document.body.appendChild(button);
    button.addEventListener("click", () => {
        if (!creating) {
            creating = true;
            maze.createMaze();
        }
    });
}

function draw() {
    background(0)
    maze.drawPath();
}