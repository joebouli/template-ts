import Component from "../component";
import { watchTemplate } from "./watch-template";
import WatchModel from "./watch-model";
import Matrix from "../../library/matrix";
import Vector from "../../library/vector";
import WatchView from "./watch-view";
import globalTimeController from "../watch-list/time-controller";

export enum WatchMode {
    DisplayTime,
    EditHours,
    EditMinutes
}

export default class WatchController {
    private watchView: WatchView;
    private watchModel: WatchModel;
    private isLightOn: boolean = false;
    private is24HourFormat: boolean = true;
    private mode: WatchMode = WatchMode.DisplayTime;
    private rotationAngle: number = 0; // Initial rotation angle
    private scaleFactor: number = 1; // Initial scale factor
    private arbitraryPoint: Vector; // Arbitrary point for rotation

    constructor(timeZone: string) {
        this.watchModel = new WatchModel(timeZone);
        this.watchView = new WatchView(timeZone);

        // Initial update of the time display
        this.updateTime(globalTimeController.getCurrentTime());

        // Event listeners for buttons
        this.watchView.modeButton.addEventListener('click', () => this.toggleMode());
        this.watchView.increaseButton.addEventListener('click', () => this.handleIncrease());
        this.watchView.lightButton.addEventListener('click', () => this.toggleLight());
        this.watchView.resetButton.addEventListener('click', () => this.resetTime());
        this.watchView.formatButton.addEventListener('click', () => this.toggleFormat());

        this.arbitraryPoint = new Vector(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        );

        // Listen for 'Enter' key press to start animation
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                this.startAnimation();
            }
        });
    }

    public updateTime(baseTime: Date): void {
        const time = new Date(baseTime);
        time.setHours(time.getHours() + this.watchModel.hoursIncrement);
        time.setMinutes(time.getMinutes() + this.watchModel.minutesIncrement);

        const options = { timeZone: this.watchModel.timeZone, hour12: !this.is24HourFormat };
        this.watchView.updateTime(time, options);
    }


    private toggleMode(): void {
        switch (this.mode) {
            case WatchMode.DisplayTime:
                this.mode = WatchMode.EditHours;
                break;
            case WatchMode.EditHours:
                this.mode = WatchMode.EditMinutes;
                break;
            case WatchMode.EditMinutes:
                this.mode = WatchMode.DisplayTime;
                break;
        }
        this.updateTime(globalTimeController.getCurrentTime());
    }

    private handleIncrease(): void {
        if (this.mode === WatchMode.EditHours) {
            this.watchModel.increaseHours();
        } else if (this.mode === WatchMode.EditMinutes) {
            this.watchModel.increaseMinutes();
        }
        this.updateTime(globalTimeController.getCurrentTime());
    }

    private toggleLight(): void {
        this.isLightOn = !this.isLightOn;
        this.watchView.toggleLight(this.isLightOn);
    }

    private resetTime(): void {
        this.watchModel.resetTime();
        this.updateTime(globalTimeController.getCurrentTime());
    }

    private toggleFormat(): void {
        this.is24HourFormat = !this.is24HourFormat;
        this.updateTime(globalTimeController.getCurrentTime());
    }

    private startAnimation(): void {
        const self = this;

        function animate() {
            const translateToArbitraryPoint = Matrix.translation(self.arbitraryPoint.x, self.arbitraryPoint.y);
            const selfRotationMatrix = Matrix.rotation(self.rotationAngle);
            const scaleMatrix = Matrix.scaling(self.scaleFactor, self.scaleFactor);

            const combinedMatrix = translateToArbitraryPoint
                .multiply(selfRotationMatrix)
                .multiply(scaleMatrix);

            const transformedPoint = combinedMatrix.transformPoint(new Vector(0, 0));
            const transform = `translate(${transformedPoint.x}px, ${transformedPoint.y}px) rotate(${self.rotationAngle}rad) scale(${self.scaleFactor})`;
            self.watchView.applyTransformation(transform);

            self.rotationAngle += Math.PI / 360; // Increment rotation by 0.5 degree
            self.scaleFactor = Math.sin(self.rotationAngle); // Scale factor based on sine function

            requestAnimationFrame(animate);
        }

        animate();
    }

    // Method to render the view
    render(parent: HTMLElement | Component): void {
        this.watchView.render(parent);
    }
}