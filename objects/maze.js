function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

class Cell {
    constructor() {
        this.forward = [];
    }

    addForward(pair) {
        this.forward.push(pair);
    }

    getForward() {
        return this.forward;
    }
}

class Maze {
    constructor(x, y, w, h, row, col) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.row = row;
        this.col = col;
        this.blockWidth = this.w / this.col;
        this.blockHeight = this.h / this.row;
        this.deltaX = this.blockWidth / 2;
        this.deltaY = this.blockHeight / 2;
        this.strokeW = Math.min(this.deltaX, this.deltaY);
        this.direction = [[1, 0], [0, 1], [-1, 0], [0, -1]];

        // Create Maze....
        this.maze = [];
        for (let i = 0; i < this.row; i++) {
            this.maze[i] = [];
            for (let j = 0; j < this.col; j++) {
                this.maze[i][j] = new Cell();
            }
        }

        // this.maze[0][0].addForward(new Pair(0, 1));
        // this.maze[0][0].addForward(new Pair(1, 0));
    }

    outsideGrid(i, j) {
        return (i < 0 || j < 0 || i >= this.row || j >= this.col);
    }

    async createMazeRec(i, j, visited) {
        visited[i][j] = true;
        let direction = [...this.direction];
        shuffle(direction, true);

        for (let [a, b] of direction) {
            let newI = i + a;
            let newJ = j + b;
            if (!this.outsideGrid(newI, newJ) && !visited[newI][newJ]) {
                this.maze[i][j].addForward(new Pair(newI, newJ));
                await sleep(20);
                await this.createMazeRec(newI, newJ, visited);
            }
        }
    }

    async createMaze() {
        // Create visited array.....
        const visited = [];
        for (let i = 0; i < this.row; i++) {
            visited[i] = [];
            for (let j = 0; j < this.col; j++) {
                visited[i][j] = false;
            }
        }

        await this.createMazeRec(0, 0, visited);
        console.log("done.");
    }

    drawPath() {
        stroke(255);
        for (let i = 0; i < this.row; i++) {
            let currY = this.y + this.blockHeight * i;
            for (let j = 0; j < this.col; j++) {
                let currX = this.x + this.blockWidth * j;

                this.maze[i][j].getForward().forEach((pair) => {
                    let destX = this.x + this.blockWidth * pair.b;
                    let destY = this.y + this.blockHeight * pair.a;
                    strokeWeight(this.strokeW);
                    line(currX + this.deltaX, currY + this.deltaY, destX + this.deltaX, destY + this.deltaY);
                });
            }
        }
    }

    draw() {
        // Draw Grid.....
        stroke(255);
        strokeWeight(1);
        noFill();
        for (let i = 0; i < this.row; i++) {
            let y = this.y + this.blockHeight * i;
            for (let j = 0; j < this.col; j++) {
                let x = this.x + this.blockWidth * j;
                rect(x, y, this.blockWidth, this.blockHeight);
            }
        }
        this.drawPath();
    }
}

