import Component from "../component";
import { watchTemplate } from "./watch-template";

import { WatchMode } from "../model/watch-mode";
import WatchModel from "../model/watch-model";
import Matrix from "../library/Matrix";
import Vector2D from "../library/vector2D";

export default class Watch extends Component {

    readonly element: HTMLDivElement;
    private readonly timeDisplay: HTMLElement;
    private readonly modeButton: HTMLButtonElement;
    private readonly increaseButton: HTMLButtonElement;
    private readonly lightButton: HTMLButtonElement;
    private readonly resetButton: HTMLButtonElement;
    private readonly formatButton: HTMLButtonElement;
    public mode: WatchMode = WatchMode.DisplayTime;
    private rotationAngle: number = 0; // Initial rotation angle
    private scaleFactor: number = 1; // Initial scale factor
    private arbitraryPoint: Vector2D; // Arbitrary point for rotation



    private watchModel: WatchModel;

    constructor(timeZone: string) {
        super();

        // Initialize WatchModel with timezone
        this.watchModel = new WatchModel(timeZone);

        // Create the main element and set its inner HTML using template
        this.element = document.createElement("div");
        const watchListHTML = watchTemplate(timeZone);
        this.element.innerHTML = watchListHTML;

        // Bind HTML elements to properties
        this.timeDisplay = this.element.querySelector('.time');
        this.modeButton = this.element.querySelector('.stopwatch-mode-button');
        this.increaseButton = this.element.querySelector('.stopwatch-increment-button');
        this.lightButton = this.element.querySelector('.stopwatch-light-button');
        this.resetButton = this.element.querySelector('.stopwatch-reset-button');
        this.formatButton = this.element.querySelector('.stopwatch-format-button');

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

        this.arbitraryPoint = new Vector2D(
            Math.random() * this.element.offsetWidth,
            Math.random() * this.element.offsetHeight
        );
        // Listen for 'Enter' key press to start animation
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if(timeZone=="Europe/Paris")
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
    }

    // Handle incrementing hours or minutes based on current mode
    private handleIncrease(): void {
        switch (this.mode) {
            case WatchMode.EditHours:
                this.watchModel.hoursIncrement++;
                break;
            case WatchMode.EditMinutes:
                this.watchModel.minutesIncrement++;
                break;
            default:
                // No action in other modes
                break;
        }
        this.updateTime();
    }

    // Toggle the light on/off and update the UI
    private toggleLight(): void {
        this.watchModel.isLightOn = !this.watchModel.isLightOn;
        this.element.classList.toggle('light-on', this.watchModel.isLightOn);
    }

    // Reset the hours and minutes increments to zero and update the time display
    private resetTime(): void {
        this.watchModel.hoursIncrement = 0;
        this.watchModel.minutesIncrement = 0;
        this.updateTime();
    }

    // Toggle between 24-hour and 12-hour format and update the time display
    private toggleFormat(): void {
        this.watchModel.is24HourFormat = !this.watchModel.is24HourFormat;
        this.updateTime();
    }

    // TO COMPLETE
    private startAnimation(): void {
        // Transformation matrices
        const selfRotationMatrix = Matrix.rotation(this.rotationAngle); // Rotate on itself
        const scaleMatrix = Matrix.scaling(this.scaleFactor, this.scaleFactor); // Scale up/down

        const combinedMatrix = selfRotationMatrix.multiply(scaleMatrix);

        // Transform the watch element
        const transformedPoint = combinedMatrix.transformPoint(this.arbitraryPoint);
        this.element.style.transform = `translate(${transformedPoint.x - this.arbitraryPoint.x}px, ${transformedPoint.y - this.arbitraryPoint.y}px) rotate(${this.rotationAngle}rad) scale(${this.scaleFactor})`;

        // Update rotation angle and scale factor for next frame
        this.rotationAngle += Math.PI / 180; // Increment rotation by 1 degree
        this.scaleFactor = Math.sin(this.rotationAngle); // Scale factor based on sine function

        // Schedule next frame
        requestAnimationFrame(() => this.startAnimation());
    }

}
