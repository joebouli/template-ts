import Vector2D from './Vector2D';

export default class Matrix {
    private readonly data: number[][];

    constructor(matrix: number[][]) {
        if (matrix.length !== 3 || matrix[0].length !== 3) {
            throw new Error("Matrix must be 3x3");
        }
        this.data = matrix;
    }

    // Method to get an element from the matrix
    getElement(row: number, col: number): number {
        return this.data[row][col];
    }

    // Method to calculate the determinant of the matrix
    determinant(): number {
        const [a, b, c] = this.data[0];
        const [d, e, f] = this.data[1];
        const [g, h, i] = this.data[2];

        return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
    }

    // Method to get the inverse matrix
    inverse(): Matrix {
        const det = this.determinant();
        if (det === 0) {
            throw new Error("Matrix is not invertible (determinant is zero)");
        }

        const [[a, b, c], [d, e, f], [g, h, i]] = this.data;
        const invDet = 1 / det;

        const invMatrix = [
            [e * i - f * h, c * h - b * i, b * f - c * e],
            [f * g - d * i, a * i - c * g, c * d - a * f],
            [d * h - e * g, g * b - a * h, a * e - d * b]
        ];

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                invMatrix[row][col] *= invDet;
            }
        }

        return new Matrix(invMatrix);
    }

    // Method to multiply the matrix by another matrix
    multiply(matrix: Matrix): Matrix {
        const result: number[][] = [];
        for (let i = 0; i < 3; i++) {
            result[i] = [];
            for (let j = 0; j < 3; j++) {
                result[i][j] = 0;
                for (let k = 0; k < 3; k++) {
                    result[i][j] += this.data[i][k] * matrix.getElement(k, j);
                }
            }
        }
        return new Matrix(result);
    }

    // Method to transform a point/vector with the matrix
    transformPoint(point: Vector2D): Vector2D {
        const x = this.data[0][0] * point.x + this.data[0][1] * point.y + this.data[0][2];
        const y = this.data[1][0] * point.x + this.data[1][1] * point.y + this.data[1][2];
        return new Vector2D(x, y);
    }

    // Function to create a translation matrix
    static translation(tx: number, ty: number): Matrix {
        return new Matrix([
            [1, 0, tx],
            [0, 1, ty],
            [0, 0, 1]
        ]);
    }

    // Function to create a rotation matrix
    static rotation(angle: number): Matrix {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new Matrix([
            [cos, -sin, 0],
            [sin, cos, 0],
            [0, 0, 1]
        ]);
    }

    // Function to create a scaling matrix
    static scaling(sx: number, sy: number): Matrix {
        return new Matrix([
            [sx, 0, 0],
            [0, sy, 0],
            [0, 0, 1]
        ]);
    }
}
