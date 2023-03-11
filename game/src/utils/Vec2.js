

export class Vec2 {
    #x
    #y
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    set x(myX) {
        this.#x = myX;
        return this;
    }

    set y(myY) {
        this.#y = myY;
        return this;
    }

    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }
}