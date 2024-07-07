import Component from "../component";
import {watchTemplate} from "./watch-template";
import WatchModel, {WatchMode} from "../../model/watch-model";
import Matrix from "../../library/matrix";
import Vector from "../../library/vector";

export default class Watch extends Component {
    readonly element: HTMLDivElement;
    private readonly timeDisplay: HTMLElement;
    private readonly modeButton: HTMLButtonElement;
    private readonly increaseButton: HTMLButtonElement;
    private readonly lightButton: HTMLButtonElement;
    private readonly resetButton: HTMLButtonElement;
    private readonly formatButton: HTMLButtonElement;
    private rotationAngle: number = 0; // Initial rotation angle
    private scaleFactor: number = 1; // Initial scale factor
    private arbitraryPoint: Vector; // Arbitrary point for rotation

    private watchModel: WatchModel;

    constructor(timeZone: string) {
        super();

        // Initialize WatchModel with timezone
        this.watchModel = new WatchModel(timeZone);

        // Create the main element and set its inner HTML using template
        this.element = document.createElement("div");
        this.element.innerHTML = watchTemplate(timeZone);

        // Bind HTML elements to properties UI
        this.timeDisplay = this.element.querySelector('.time');
        this.modeButton = this.element.querySelector('.watch-mode-button');
        this.increaseButton = this.element.querySelector('.watch-increment-button');
        this.lightButton = this.element.querySelector('.watch-light-button');
        this.resetButton = this.element.querySelector('.watch-reset-button');
        this.formatButton = this.element.querySelector('.watch-format-button');
        this.updateTime();

        // Event listeners for buttons
        this.modeButton.addEventListener('click', () => this.toggleMode());
        this.increaseButton.addEventListener('click', () => this.handleIncrease());
        this.lightButton.addEventListener('click', () => this.toggleLight());
        this.resetButton.addEventListener('click', () => this.resetTime());
        this.formatButton.addEventListener('click', () => this.toggleFormat());

        // Update time display every second
        setInterval(() => {
            this.updateTime();
        }, 1000);

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

    // Get current time adjusted by increments
    private getCurrentTime(): Date {
        const time = new Date();
        time.setHours(time.getHours() + this.watchModel.hoursIncrement);
        time.setMinutes(time.getMinutes() + this.watchModel.minutesIncrement);
        return time;
    }

    // Update time display based on current settings
    private updateTime(): void {
        const currentTime = this.getCurrentTime();
        const options = { timeZone: this.watchModel.timeZone, hour12: !this.watchModel.is24HourFormat };
        this.timeDisplay.textContent = currentTime.toLocaleTimeString('en-GB', options);
    }

    // Toggle between different modes (DisplayTime, EditHours, EditMinutes)
    private toggleMode(): void {
        this.watchModel.toggleMode();
        this.updateTime(); // Ensure the display updates if needed
    }

    // Handle incrementing hours or minutes based on current mode
    private handleIncrease(): void {
        if (this.watchModel.mode === WatchMode.EditHours) {
            this.watchModel.increaseHours();
        } else if (this.watchModel.mode === WatchMode.EditMinutes) {
            this.watchModel.increaseMinutes();
        }
        this.updateTime();
    }

    // Toggle the light on/off and update the UI
    private toggleLight(): void {
        this.watchModel.toggleLight();
        this.element.classList.toggle('light-on', this.watchModel.isLightOn);
    }

    // Reset the hours and minutes increments to zero and update the time display
    private resetTime(): void {
        this.watchModel.resetTime();
        this.updateTime();
    }

    // Toggle between 24-hour and 12-hour format and update the time display
    private toggleFormat(): void {
        this.watchModel.toggleFormat();
        this.updateTime();
    }

    // TO COMPLETE
    startAnimation(): void {
        const self = this;

        function animate() {
            // Create transformation matrices
            const translateToArbitraryPoint = Matrix.translation(self.arbitraryPoint.x, self.arbitraryPoint.y);
            const translateBack = Matrix.translation(-self.arbitraryPoint.x, -self.arbitraryPoint.y);
            const selfRotationMatrix = Matrix.rotation(self.rotationAngle);
            const scaleMatrix = Matrix.scaling(self.scaleFactor, self.scaleFactor);

            // Combine matrices
            const combinedMatrix = translateToArbitraryPoint
                .multiply(selfRotationMatrix)
                .multiply(scaleMatrix)
                .multiply(translateBack);

            // Apply transformation to watch element
            const transformedPoint = combinedMatrix.transformPoint(new Vector(0, 0));
            const watchElement = document.querySelector('.watch') as HTMLElement;
            if (watchElement) {
                watchElement.style.transform = `translate(${transformedPoint.x}px, ${transformedPoint.y}px) rotate(${self.rotationAngle}rad) scale(${self.scaleFactor})`;
            }

            // Log values for debugging
            console.log("Arbitrary Point:", self.arbitraryPoint);
            console.log("Rotation Angle:", self.rotationAngle);
            console.log("Scale Factor:", self.scaleFactor);
            console.log("Transformed Point:", transformedPoint);

            // Update rotation angle and scale factor for next frame
            self.rotationAngle += Math.PI / 360; // Increment rotation by 0.5 degree
            self.scaleFactor = Math.sin(self.rotationAngle); // Scale factor based on sine function

            // Request next frame
            requestAnimationFrame(animate);
        }

        // Start animation loop
        animate();
    }
}
