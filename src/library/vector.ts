export default class Vector {
    constructor(public x: number, public y: number) {}

    // Method to add another vector
    add(other: Vector): Vector {
        return new Vector(this.x + other.x, this.y + other.y);
    }

    // Method to subtract another vector
    subtract(other: Vector): Vector {
        return new Vector(this.x - other.x, this.y - other.y);
    }

    // Method to multiply by a scalar
    multiplyScalar(scalar: number): Vector {
        return new Vector(this.x * scalar, this.y * scalar);
    }

    // Method to calculate the length of the vector
    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // Method to normalize the vector
    normalize(): Vector {
        const len = this.length();
        return new Vector(this.x / len, this.y / len);
    }
}
