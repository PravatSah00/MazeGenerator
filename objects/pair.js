class Pair {
    constructor(a = 0, b = a) {
        this.a = a;
        this.b = b;
    }

    getPair() {
        return [this.a, this.b];
    }

    setPair(a, b) {
        this.a = a;
        this.b = b;
    }
}