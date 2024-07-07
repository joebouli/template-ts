export enum WatchMode {
    DisplayTime,
    EditHours,
    EditMinutes
}

export default class WatchModel {
    public timeZone: string;
    public hoursIncrement: number = 0;
    public minutesIncrement: number = 0;
    public is24HourFormat: boolean = true;
    public isLightOn: boolean = false;
    public mode: WatchMode = WatchMode.DisplayTime;

    constructor(timeZone: string) {
        this.timeZone = timeZone;
    }

    toggleLight(): void {
        this.isLightOn = !this.isLightOn;
    }

    toggleFormat(): void {
        this.is24HourFormat = !this.is24HourFormat;
    }

    resetTime(): void {
        this.hoursIncrement = 0;
        this.minutesIncrement = 0;
    }

    increaseHours(): void {
        this.hoursIncrement++;
    }

    increaseMinutes(): void {
        this.minutesIncrement++;
    }

    toggleMode(): void {
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
}
