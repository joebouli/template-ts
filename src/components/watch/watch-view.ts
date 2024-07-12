import Component from "../component";
import { watchTemplate } from "./watch-template";

export default class WatchView extends Component {
    readonly element: HTMLDivElement;
    readonly timeDisplay: HTMLElement;
    readonly modeButton: HTMLButtonElement;
    readonly increaseButton: HTMLButtonElement;
    readonly lightButton: HTMLButtonElement;
    readonly resetButton: HTMLButtonElement;
    readonly formatButton: HTMLButtonElement;

    constructor(timeZone: string) {
        super();

        // Create the main element and set its inner HTML using template
        this.element = document.createElement("div");
        this.element.innerHTML = watchTemplate(timeZone);

        // Bind HTML elements to properties UI
        this.timeDisplay = this.element.querySelector('.time') as HTMLElement;
        this.modeButton = this.element.querySelector('.watch-mode-button') as HTMLButtonElement;
        this.increaseButton = this.element.querySelector('.watch-increment-button') as HTMLButtonElement;
        this.lightButton = this.element.querySelector('.watch-light-button') as HTMLButtonElement;
        this.resetButton = this.element.querySelector('.watch-reset-button') as HTMLButtonElement;
        this.formatButton = this.element.querySelector('.watch-format-button') as HTMLButtonElement;
    }

    // Method to update the time display
    updateTime(currentTime: Date, options: Intl.DateTimeFormatOptions): void {
        this.timeDisplay.textContent = currentTime.toLocaleTimeString('en-GB', options);
    }

    // Method to toggle light on/off
    toggleLight(isLightOn: boolean): void {
        this.element.classList.toggle('light-on', isLightOn);
    }

    // Method to apply transformation to the watch element
    applyTransformation(transform: string): void {
        this.element.style.transform = transform;
    }
}
