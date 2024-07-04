export default class Vector2D {
    constructor(public x: number, public y: number) {}

    // Method to add another vector
    add(other: Vector2D): Vector2D {
        return new Vector2D(this.x + other.x, this.y + other.y);
    }

    // Method to subtract another vector
    subtract(other: Vector2D): Vector2D {
        return new Vector2D(this.x - other.x, this.y - other.y);
    }

    // Method to multiply by a scalar
    multiplyScalar(scalar: number): Vector2D {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    // Method to calculate the length of the vector
    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // Method to normalize the vector
    normalize(): Vector2D {
        const len = this.length();
        return new Vector2D(this.x / len, this.y / len);
    }
}
